(function () {
  'use strict';

  // 문의 폼 → Google Apps Script(contact-config.js 의 webAppUrl) 전송
  // 접수 코드: google-apps-script/contact-handler.gs

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getConfig() {
    return (window.AQBAR_CONTACT_CONFIG && window.AQBAR_CONTACT_CONFIG.webAppUrl) || '';
  }

  function init() {
    var form = document.getElementById('aq-contact-form');
    var done = document.getElementById('aq-contact-done');
    var error = document.getElementById('aq-form-error');
    if (!form || !done) return;

    var picks = form.querySelectorAll('.aq-pick');
    var submitBtn = form.querySelector('[type="submit"]');

    picks.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      });
    });

    function showError(msg) {
      error.textContent = msg;
      error.hidden = !msg;
    }

    function selectedInterests() {
      var out = [];
      picks.forEach(function (btn) {
        if (btn.getAttribute('aria-pressed') === 'true') out.push(btn.getAttribute('data-pick'));
      });
      return out;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return;

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var company = form.elements.company.value.trim();

      if (!name || !email || !company) {
        showError('담당자 이름, 회사 이메일, 회사명을 모두 입력해 주세요.');
        (!name ? form.elements.name : !email ? form.elements.email : form.elements.company).focus();
        return;
      }
      if (!EMAIL_RE.test(email)) {
        showError('회사 이메일 형식을 확인해 주세요.');
        form.elements.email.focus();
        return;
      }
      showError('');

      var webAppUrl = getConfig();
      if (!webAppUrl) {
        showError('문의 접수 주소가 설정되지 않았습니다. info@aqbar.ai 로 연락 주세요.');
        return;
      }

      var interests = selectedInterests();
      var payload = {
        interests: interests,
        // 이전 버전 접수 코드와의 호환용 (채용 평가 선택 여부)
        inquiryType: interests.indexOf('채용 평가') >= 0 ? 'hiring' : 'diagnosis',
        name: name,
        email: email,
        company: company,
        source: window.innerWidth < 760 ? 'mobile' : 'desktop'
      };

      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = '전송 중...';

      fetch(webAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function () {
          form.hidden = true;
          done.hidden = false;
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', { interests: interests.join(', ') });
          }
        })
        .catch(function (err) {
          console.error('[AQbar] 문의 전송 실패:', err);
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          showError('전송에 실패했습니다. 잠시 후 다시 시도하시거나 info@aqbar.ai 로 연락 주세요.');
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
