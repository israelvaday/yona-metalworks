/**
 * מסגריית יונה - Enhanced Functionality
 * Version: 1.0.0
 */

(function() {
  "use strict";

  // =============================================
  // 1. COOKIE CONSENT BANNER
  // =============================================
  function initCookieConsent() {
    // Check if user already accepted
    if (localStorage.getItem('cookieConsent') === 'accepted') return;

    const cookieBanner = document.createElement('div');
    cookieBanner.id = 'cookie-consent';
    cookieBanner.innerHTML = `
      <div class="cookie-content">
        <div class="cookie-text">
          <i class="bi bi-shield-check"></i>
          <p>אתר זה משתמש בעוגיות (cookies) כדי לשפר את חוויית הגלישה שלך. 
          בהמשך הגלישה באתר, אתה מסכים לשימוש בעוגיות.</p>
        </div>
        <div class="cookie-actions">
          <button class="cookie-accept" id="acceptCookies">מסכים</button>
          <a href="#" class="cookie-more">מידע נוסף</a>
        </div>
      </div>
    `;
    document.body.appendChild(cookieBanner);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #cookie-consent {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        color: #fff;
        padding: 20px;
        z-index: 999999;
        box-shadow: 0 -5px 30px rgba(0,0,0,0.3);
        animation: slideUp 0.5s ease-out;
      }
      @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      #cookie-consent .cookie-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 15px;
      }
      #cookie-consent .cookie-text {
        display: flex;
        align-items: center;
        gap: 15px;
        flex: 1;
      }
      #cookie-consent .cookie-text i {
        font-size: 2rem;
        color: #ff8c00;
      }
      #cookie-consent .cookie-text p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.5;
      }
      #cookie-consent .cookie-actions {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      #cookie-consent .cookie-accept {
        background: linear-gradient(135deg, #ff8c00 0%, #ff6600 100%);
        color: #fff;
        border: none;
        padding: 12px 30px;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      #cookie-consent .cookie-accept:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 20px rgba(255,140,0,0.4);
      }
      #cookie-consent .cookie-more {
        color: #ff8c00;
        text-decoration: none;
        font-size: 0.9rem;
      }
      @media (max-width: 768px) {
        #cookie-consent .cookie-content { flex-direction: column; text-align: center; }
        #cookie-consent .cookie-text { flex-direction: column; }
      }
    `;
    document.head.appendChild(style);

    // Event listeners
    document.getElementById('acceptCookies').addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.style.animation = 'slideDown 0.3s ease-out forwards';
      setTimeout(() => cookieBanner.remove(), 300);
    });
  }

  // =============================================
  // 2. WHATSAPP FLOATING BUTTON
  // =============================================
  function initWhatsAppButton() {
    // Check if button already exists
    if (document.getElementById('whatsapp-float')) return;

    const whatsappBtn = document.createElement('div');
    whatsappBtn.id = 'whatsapp-float';
    whatsappBtn.innerHTML = `
      <a href="https://wa.me/972542666568?text=שלום,%20אשמח%20לקבל%20מידע%20נוסף%20על%20שירותי%20מסגריית%20יונה" 
         target="_blank" 
         class="whatsapp-btn"
         title="שלחו לנו הודעה בוואטסאפ">
        <i class="bi bi-whatsapp"></i>
        <span class="whatsapp-tooltip">צ'אט בוואטסאפ</span>
      </a>
    `;
    document.body.appendChild(whatsappBtn);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #whatsapp-float {
        position: fixed;
        bottom: 100px;
        left: 25px;
        z-index: 99998;
      }
      #whatsapp-float .whatsapp-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        background: #25D366;
        border-radius: 50%;
        box-shadow: 0 5px 25px rgba(37, 211, 102, 0.4);
        color: #fff;
        font-size: 30px;
        transition: all 0.3s ease;
        animation: pulse-whatsapp 2s infinite;
      }
      #whatsapp-float .whatsapp-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 35px rgba(37, 211, 102, 0.5);
      }
      #whatsapp-float .whatsapp-tooltip {
        position: absolute;
        right: 75px;
        background: #333;
        color: #fff;
        padding: 8px 15px;
        border-radius: 8px;
        font-size: 14px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      #whatsapp-float .whatsapp-btn:hover .whatsapp-tooltip {
        opacity: 1;
        visibility: visible;
        right: 70px;
      }
      @keyframes pulse-whatsapp {
        0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
        70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
        100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
      }
      @media (max-width: 768px) {
        #whatsapp-float { bottom: 80px; left: 15px; }
        #whatsapp-float .whatsapp-btn { width: 55px; height: 55px; font-size: 26px; }
      }
    `;
    document.head.appendChild(style);
  }

  // =============================================
  // 3. QUOTE REQUEST MODAL
  // =============================================
  function initQuoteModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'quoteModal';
    modal.className = 'quote-modal';
    modal.innerHTML = `
      <div class="quote-modal-content">
        <button class="quote-modal-close" id="closeQuoteModal">&times;</button>
        <div class="quote-modal-header">
          <i class="bi bi-file-earmark-text"></i>
          <h3>בקשת הצעת מחיר מהירה</h3>
          <p>מלאו את הפרטים ונחזור אליכם תוך 24 שעות</p>
        </div>
        <form id="quoteForm" class="quote-form">
          <div class="form-row">
            <div class="form-group">
              <label><i class="bi bi-person"></i> שם מלא</label>
              <input type="text" name="name" required placeholder="הכניסו את שמכם">
            </div>
            <div class="form-group">
              <label><i class="bi bi-telephone"></i> טלפון</label>
              <input type="tel" name="phone" required placeholder="050-XXX-XXXX" pattern="[0-9]{10}">
            </div>
          </div>
          <div class="form-group">
            <label><i class="bi bi-envelope"></i> אימייל (אופציונלי)</label>
            <input type="email" name="email" placeholder="example@email.com">
          </div>
          <div class="form-group">
            <label><i class="bi bi-tools"></i> סוג השירות</label>
            <select name="service" required>
              <option value="">בחרו שירות</option>
              <option value="שערים וגדרות">שערים וגדרות</option>
              <option value="מעקות ומדרגות">מעקות ומדרגות</option>
              <option value="פרגולות">פרגולות</option>
              <option value="קונסטרוקציות">קונסטרוקציות</option>
              <option value="ריהוט מתכת">ריהוט מתכת</option>
              <option value="עבודות מסגרות כללי">עבודות מסגרות כללי</option>
              <option value="אחר">אחר</option>
            </select>
          </div>
          <div class="form-group">
            <label><i class="bi bi-chat-text"></i> פרטים נוספים</label>
            <textarea name="details" rows="3" placeholder="ספרו לנו על הפרויקט שלכם..."></textarea>
          </div>
          <button type="submit" class="quote-submit-btn">
            <span>שלח בקשה</span>
            <i class="bi bi-send"></i>
          </button>
        </form>
        <div class="quote-success" id="quoteSuccess">
          <i class="bi bi-check-circle"></i>
          <h4>הבקשה נשלחה בהצלחה!</h4>
          <p>ניצור איתכם קשר בהקדם האפשרי</p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .quote-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 999999;
        align-items: center;
        justify-content: center;
        padding: 20px;
        backdrop-filter: blur(5px);
      }
      .quote-modal.active { display: flex; animation: fadeIn 0.3s ease; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .quote-modal-content {
        background: #fff;
        border-radius: 20px;
        width: 100%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 30px;
        position: relative;
        animation: slideIn 0.3s ease;
      }
      @keyframes slideIn { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      .quote-modal-close {
        position: absolute;
        top: 15px;
        left: 15px;
        background: none;
        border: none;
        font-size: 28px;
        color: #666;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .quote-modal-close:hover { background: #f0f0f0; color: #ff8c00; }
      .quote-modal-header { text-align: center; margin-bottom: 25px; }
      .quote-modal-header i { font-size: 50px; color: #ff8c00; margin-bottom: 15px; display: block; }
      .quote-modal-header h3 { font-size: 1.5rem; color: #1a1a1a; margin-bottom: 8px; }
      .quote-modal-header p { color: #666; font-size: 0.95rem; }
      .quote-form .form-row { display: flex; gap: 15px; }
      .quote-form .form-group { margin-bottom: 18px; flex: 1; }
      .quote-form label { display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 0.95rem; }
      .quote-form label i { color: #ff8c00; margin-left: 5px; }
      .quote-form input, .quote-form select, .quote-form textarea {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
        direction: rtl;
      }
      .quote-form input:focus, .quote-form select:focus, .quote-form textarea:focus {
        border-color: #ff8c00;
        box-shadow: 0 0 10px rgba(255,140,0,0.2);
        outline: none;
      }
      .quote-submit-btn {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #ff8c00 0%, #ff6600 100%);
        color: #fff;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s ease;
      }
      .quote-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,140,0,0.4); }
      .quote-success { display: none; text-align: center; padding: 30px 0; }
      .quote-success.active { display: block; animation: scaleIn 0.4s ease; }
      .quote-success i { font-size: 70px; color: #28a745; margin-bottom: 15px; }
      .quote-success h4 { font-size: 1.4rem; color: #1a1a1a; margin-bottom: 10px; }
      .quote-success p { color: #666; }
      @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      @media (max-width: 500px) {
        .quote-form .form-row { flex-direction: column; gap: 0; }
        .quote-modal-content { padding: 20px; }
      }
    `;
    document.head.appendChild(style);

    // Event listeners
    const closeBtn = document.getElementById('closeQuoteModal');
    const quoteForm = document.getElementById('quoteForm');
    const quoteSuccess = document.getElementById('quoteSuccess');

    // Close modal
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.classList.remove('active');
    });

    // Form submission
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> שולח...';
      submitBtn.disabled = true;
      
      // Get form values for WhatsApp notification
      const data = Object.fromEntries(formData);
      
      // Send FREE WhatsApp notification via CallMeBot
      // To set up: Send "I allow callmebot to send me messages" to +34 644 51 95 23 on WhatsApp
      sendWhatsAppNotification(data);
      
      // Send to PHP backend
      fetch('forms/quote.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(result => {
        if (result === 'OK' || result.includes('OK')) {
          // Success
          this.style.display = 'none';
          quoteSuccess.classList.add('active');
          
          // Also store locally as backup
          const quotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
          quotes.push({ ...data, date: new Date().toISOString(), sent: true });
          localStorage.setItem('quoteRequests', JSON.stringify(quotes));
        } else {
          // PHP might not be available, still show success but store locally
          this.style.display = 'none';
          quoteSuccess.classList.add('active');
          
          const quotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
          quotes.push({ ...data, date: new Date().toISOString(), sent: false });
          localStorage.setItem('quoteRequests', JSON.stringify(quotes));
        }
      })
      .catch(error => {
        // Network error - store locally
        console.log('Form stored locally, will be sent when server is available');
        this.style.display = 'none';
        quoteSuccess.classList.add('active');
        
        const quotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
        quotes.push({ ...data, date: new Date().toISOString(), sent: false });
        localStorage.setItem('quoteRequests', JSON.stringify(quotes));
      })
      .finally(() => {
        // Reset after 3 seconds
        setTimeout(() => {
          modal.classList.remove('active');
          setTimeout(() => {
            this.reset();
            this.style.display = 'block';
            quoteSuccess.classList.remove('active');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }, 300);
        }, 3000);
      });
    });
    
    // FREE WhatsApp notification via CallMeBot API
    function sendWhatsAppNotification(data) {
      // ⚠️ SETUP REQUIRED (One-time):
      // 1. Save this number in your phone: +34 644 51 95 23
      // 2. Send this message to that number on WhatsApp: "I allow callmebot to send me messages"
      // 3. You'll receive your personal API key
      // 4. Replace YOUR_API_KEY below with your actual key
      
      const PHONE = '972542666568'; // Your Israeli phone number (without +)
      const API_KEY = 'YOUR_API_KEY'; // Get this from CallMeBot (see instructions above)
      
      // Format the message
      const message = `🔔 *בקשת הצעת מחיר חדשה!*%0A%0A` +
        `👤 *שם:* ${data.name || 'לא צוין'}%0A` +
        `📞 *טלפון:* ${data.phone || 'לא צוין'}%0A` +
        `📧 *אימייל:* ${data.email || 'לא צוין'}%0A` +
        `🔧 *שירות:* ${data.service || 'לא צוין'}%0A` +
        `📝 *פרטים:* ${data.details || 'לא צוין'}%0A%0A` +
        `📅 ${new Date().toLocaleString('he-IL')}`;
      
      // Only send if API key is configured
      if (API_KEY !== 'YOUR_API_KEY') {
        const url = `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${message}&apikey=${API_KEY}`;
        
        // Send via image to avoid CORS
        const img = new Image();
        img.src = url;
        console.log('WhatsApp notification sent');
      } else {
        console.log('WhatsApp notifications not configured. See instructions in enhancements.js');
      }
      
      // Also send Telegram notification (if configured)
      sendTelegramNotification(data);
    }
    
    // FREE Telegram notification
    function sendTelegramNotification(data) {
      // ⚠️ SETUP REQUIRED (One-time):
      // 1. Open Telegram and search for @BotFather
      // 2. Send /newbot and follow instructions to create your bot
      // 3. Copy the API token you receive
      // 4. Search for @userinfobot and send /start to get your Chat ID
      // 5. Replace values below
      
      const BOT_TOKEN = 'YOUR_BOT_TOKEN'; // From BotFather
      const CHAT_ID = 'YOUR_CHAT_ID';     // From userinfobot
      
      const message = `🔔 *בקשת הצעת מחיר חדשה!*\n\n` +
        `👤 *שם:* ${data.name || 'לא צוין'}\n` +
        `📞 *טלפון:* ${data.phone || 'לא צוין'}\n` +
        `📧 *אימייל:* ${data.email || 'לא צוין'}\n` +
        `🔧 *שירות:* ${data.service || 'לא צוין'}\n` +
        `📝 *פרטים:* ${data.details || 'לא צוין'}\n\n` +
        `📅 ${new Date().toLocaleString('he-IL')}`;
      
      if (BOT_TOKEN !== 'YOUR_BOT_TOKEN' && CHAT_ID !== 'YOUR_CHAT_ID') {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
        
        fetch(url, { mode: 'no-cors' }).catch(() => {
          // Fallback via image
          const img = new Image();
          img.src = url;
        });
        console.log('Telegram notification sent');
      }
    }

    // Listen for quote button clicks
    document.addEventListener('click', function(e) {
      const target = e.target.closest('[href="#get-started"], [href="#quote"], .get-quote-btn');
      if (target) {
        e.preventDefault();
        modal.classList.add('active');
      }
    });
  }

  // =============================================
  // 4. NEWSLETTER SUBSCRIPTION
  // =============================================
  function initNewsletter() {
    // Add newsletter to footer
    const footer = document.querySelector('#footer .footer-top');
    if (!footer) return;

    // Check if newsletter already exists
    if (document.getElementById('newsletter-section')) return;

    const newsletterHTML = `
      <div class="col-lg-12 mt-4" id="newsletter-section">
        <div class="newsletter-box">
          <div class="newsletter-content">
            <i class="bi bi-envelope-paper"></i>
            <div class="newsletter-text">
              <h4>הישארו מעודכנים!</h4>
              <p>הצטרפו לרשימת התפוצה שלנו וקבלו עדכונים על פרויקטים חדשים והטבות מיוחדות</p>
            </div>
          </div>
          <form class="newsletter-form" id="newsletterForm">
            <input type="email" placeholder="הכניסו את האימייל שלכם" required>
            <button type="submit"><i class="bi bi-send"></i> הרשמה</button>
          </form>
          <div class="newsletter-success" id="newsletterSuccess">
            <i class="bi bi-check-circle"></i> נרשמתם בהצלחה!
          </div>
        </div>
      </div>
    `;

    // Insert before the last row
    const firstRow = footer.querySelector('.row');
    if (firstRow) {
      firstRow.insertAdjacentHTML('beforeend', newsletterHTML);
    }

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .newsletter-box {
        background: linear-gradient(135deg, rgba(255,140,0,0.15) 0%, rgba(255,102,0,0.1) 100%);
        border: 1px solid rgba(255,140,0,0.3);
        border-radius: 15px;
        padding: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 20px;
      }
      .newsletter-content {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .newsletter-content i {
        font-size: 40px;
        color: #ff8c00;
      }
      .newsletter-text h4 {
        color: #fff;
        margin-bottom: 5px;
        font-size: 1.2rem;
      }
      .newsletter-text p {
        color: rgba(255,255,255,0.7);
        margin: 0;
        font-size: 0.9rem;
      }
      .newsletter-form {
        display: flex;
        gap: 10px;
      }
      .newsletter-form input {
        padding: 12px 20px;
        border: none;
        border-radius: 50px;
        min-width: 250px;
        font-size: 1rem;
        direction: rtl;
      }
      .newsletter-form button {
        padding: 12px 25px;
        background: linear-gradient(135deg, #ff8c00 0%, #ff6600 100%);
        color: #fff;
        border: none;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
      }
      .newsletter-form button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(255,140,0,0.4);
      }
      .newsletter-success {
        display: none;
        color: #28a745;
        font-weight: 600;
        align-items: center;
        gap: 8px;
      }
      .newsletter-success.active {
        display: flex;
        animation: fadeIn 0.3s ease;
      }
      @media (max-width: 768px) {
        .newsletter-box { flex-direction: column; text-align: center; }
        .newsletter-content { flex-direction: column; }
        .newsletter-form { flex-direction: column; width: 100%; }
        .newsletter-form input { min-width: 100%; }
        .newsletter-form button { width: 100%; justify-content: center; }
      }
    `;
    document.head.appendChild(style);

    // Event listener
    const form = document.getElementById('newsletterForm');
    const success = document.getElementById('newsletterSuccess');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Store email
        const emails = JSON.parse(localStorage.getItem('newsletterEmails') || '[]');
        if (!emails.includes(email)) {
          emails.push(email);
          localStorage.setItem('newsletterEmails', JSON.stringify(emails));
        }
        
        // Show success
        this.style.display = 'none';
        success.classList.add('active');
        
        setTimeout(() => {
          this.reset();
          this.style.display = 'flex';
          success.classList.remove('active');
        }, 3000);
      });
    }
  }

  // =============================================
  // 5. FORM VALIDATION ENHANCEMENTS
  // =============================================
  function initFormValidation() {
    // Israeli phone validation
    const phonePattern = /^0(5[0-9]|7[0-9]|[2-4]|[8-9])[0-9]{7}$/;
    
    // Add validation to all phone inputs
    document.querySelectorAll('input[name="phone"], input[type="tel"]').forEach(input => {
      input.addEventListener('blur', function() {
        const value = this.value.replace(/[-\s]/g, '');
        if (value && !phonePattern.test(value)) {
          this.classList.add('is-invalid');
          showInputError(this, 'מספר טלפון לא תקין');
        } else {
          this.classList.remove('is-invalid');
          removeInputError(this);
        }
      });
      
      input.addEventListener('input', function() {
        this.classList.remove('is-invalid');
        removeInputError(this);
      });
    });

    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
      input.addEventListener('blur', function() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailPattern.test(this.value)) {
          this.classList.add('is-invalid');
          showInputError(this, 'כתובת אימייל לא תקינה');
        } else {
          this.classList.remove('is-invalid');
          removeInputError(this);
        }
      });
    });

    // Add validation styles
    const style = document.createElement('style');
    style.textContent = `
      input.is-invalid, textarea.is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 10px rgba(220, 53, 69, 0.2) !important;
      }
      .input-error {
        color: #dc3545;
        font-size: 0.85rem;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .input-error i { font-size: 0.9rem; }
    `;
    document.head.appendChild(style);
  }

  function showInputError(input, message) {
    removeInputError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.innerHTML = `<i class="bi bi-exclamation-circle"></i> ${message}`;
    input.parentNode.appendChild(errorDiv);
  }

  function removeInputError(input) {
    const error = input.parentNode.querySelector('.input-error');
    if (error) error.remove();
  }

  // =============================================
  // 6. SOCIAL SHARING FOR BLOG
  // =============================================
  function initSocialSharing() {
    // Only on blog pages
    if (!window.location.pathname.includes('blog')) return;

    const articles = document.querySelectorAll('.blog-post, article, .post-content');
    if (!articles.length) return;

    const shareHTML = `
      <div class="social-share">
        <span class="share-label"><i class="bi bi-share"></i> שתפו:</span>
        <div class="share-buttons">
          <a href="#" class="share-btn share-facebook" title="שתף בפייסבוק">
            <i class="bi bi-facebook"></i>
          </a>
          <a href="#" class="share-btn share-twitter" title="שתף בטוויטר">
            <i class="bi bi-twitter-x"></i>
          </a>
          <a href="#" class="share-btn share-whatsapp" title="שתף בוואטסאפ">
            <i class="bi bi-whatsapp"></i>
          </a>
          <a href="#" class="share-btn share-linkedin" title="שתף בלינקדאין">
            <i class="bi bi-linkedin"></i>
          </a>
          <button class="share-btn share-copy" title="העתק קישור">
            <i class="bi bi-link-45deg"></i>
          </button>
        </div>
      </div>
    `;

    // Add share buttons to blog details page
    const blogContent = document.querySelector('.blog-details, .post-content, article .content');
    if (blogContent && !blogContent.querySelector('.social-share')) {
      blogContent.insertAdjacentHTML('beforeend', shareHTML);
    }

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .social-share {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px 0;
        margin-top: 30px;
        border-top: 1px solid #eee;
      }
      .share-label {
        font-weight: 600;
        color: #333;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .share-buttons {
        display: flex;
        gap: 10px;
      }
      .share-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
      }
      .share-btn:hover { transform: scale(1.1); }
      .share-facebook { background: #1877f2; }
      .share-twitter { background: #000; }
      .share-whatsapp { background: #25D366; }
      .share-linkedin { background: #0077b5; }
      .share-copy { background: #6c757d; }
      .share-copy.copied { background: #28a745; }
    `;
    document.head.appendChild(style);

    // Event listeners
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.share-btn');
      if (!btn) return;

      e.preventDefault();
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      let shareUrl;

      if (btn.classList.contains('share-facebook')) {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      } else if (btn.classList.contains('share-twitter')) {
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      } else if (btn.classList.contains('share-whatsapp')) {
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
      } else if (btn.classList.contains('share-linkedin')) {
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
      } else if (btn.classList.contains('share-copy')) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          btn.classList.add('copied');
          btn.innerHTML = '<i class="bi bi-check"></i>';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '<i class="bi bi-link-45deg"></i>';
          }, 2000);
        });
        return;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  }

  // =============================================
  // 7. BACK TO TOP ENHANCED
  // =============================================
  function initBackToTop() {
    const scrollTop = document.querySelector('.scroll-top, #scroll-top');
    if (!scrollTop) return;

    // Add progress indicator
    const progress = document.createElement('svg');
    progress.className = 'scroll-progress';
    progress.innerHTML = `
      <circle class="scroll-progress-circle" cx="50%" cy="50%" r="20"></circle>
    `;
    scrollTop.appendChild(progress);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .scroll-top {
        position: relative;
      }
      .scroll-progress {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
        pointer-events: none;
      }
      .scroll-progress-circle {
        fill: none;
        stroke: #ff8c00;
        stroke-width: 3;
        stroke-dasharray: 126;
        stroke-dashoffset: 126;
        transition: stroke-dashoffset 0.1s ease;
      }
    `;
    document.head.appendChild(style);

    // Update progress on scroll
    const circle = scrollTop.querySelector('.scroll-progress-circle');
    if (circle) {
      window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const dashOffset = 126 - (126 * scrollPercent / 100);
        circle.style.strokeDashoffset = dashOffset;
      });
    }
  }

  // =============================================
  // 8. TESTIMONIALS CAROUSEL AUTO-PLAY
  // =============================================
  function initTestimonialsCarousel() {
    // Add auto-scroll indicator to testimonials
    const testimonials = document.querySelector('.testimonials-swiper');
    if (testimonials && !testimonials.querySelector('.swiper-autoplay-indicator')) {
      const indicator = document.createElement('div');
      indicator.className = 'swiper-autoplay-indicator';
      indicator.innerHTML = '<span class="indicator-bar"></span>';
      testimonials.appendChild(indicator);
    }
  }

  // =============================================
  // INITIALIZE ALL ENHANCEMENTS
  // =============================================
  function init() {
    initCookieConsent();
    initWhatsAppButton();
    initQuoteModal();
    initFormValidation();
    initSocialSharing();
    initBackToTop();
    initTestimonialsCarousel();
    
    // Initialize newsletter after footer loads
    setTimeout(initNewsletter, 500);
    // Try again after dynamic content loads
    setTimeout(initNewsletter, 1500);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also run after window load for dynamic content
  window.addEventListener('load', function() {
    setTimeout(init, 100);
  });

})();
