document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('active');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(hideToast, 4500);
    }
    function hideToast() {
        toast.classList.remove('active');
        clearTimeout(toastTimeout);
    }
    toast.querySelector('.toast__close').addEventListener('click', hideToast);

    document.querySelectorAll('.product-action-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (this.classList.contains('loading') || this.classList.contains('success')) return;

            const originalText = this.textContent;
            const actionType = this.dataset.action;
            const productName = this.dataset.product;

            let successMsg = '';
            if (actionType === 'order') successMsg = 'Заказ успешно оформлен';
            else if (actionType === 'connect') successMsg = 'Тариф подключён в демо-режиме';
            else if (actionType === 'notify') successMsg = 'Вы подписаны на уведомление о поступлении';

            this.classList.add('loading');

            setTimeout(() => {
                this.classList.remove('loading');
                this.classList.add('success');
                this.textContent = '✅ Готово';

                showToast(`${successMsg}: ${productName}.`);

                setTimeout(() => {
                    this.classList.remove('success');
                    this.textContent = originalText;
                }, 2500);
            }, 1200);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toast.classList.contains('active')) {
            hideToast();
        }
    });
});