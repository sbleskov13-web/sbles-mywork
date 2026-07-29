// services/priceService.js

class PriceService {

    /**
     * Стоимость подписки за выбранный период
     */
    calculatePeriodPrice(monthPrice, periodDays) {

        // Год
        if (periodDays === 365) {
            return monthPrice * 12 * 0.8;
        }

        // Полгода
        if (periodDays === 180) {
            return monthPrice * 6 * 0.9;
        }

        // Любой другой срок
        return (monthPrice / 30) * periodDays;

    }

    /**
     * Стоимость Modified-подписки за месяц
     */
    calculateModifiedPrice(subscriptionPlan, builderSubscription) {

        let price = subscriptionPlan.monthPrice;

        // Дополнительные диалоги
        if (builderSubscription.addedDialogs > 0) {

            if (
                builderSubscription.addedDialogs < 10 ||
                builderSubscription.addedDialogs % 10 !== 0
            ) {
                throw new Error(
                    "Количество добавленных диалогов должно быть не менее 10 и кратно 10."
                );
            }

            // 10 диалогов = 100 ₽
            // 1 диалог = 10 ₽
            price += builderSubscription.addedDialogs * 10;
        }

        // Изменение возможности писать первым
        if (
            builderSubscription.canStartChat !== null &&
            builderSubscription.canStartChat !== subscriptionPlan.canStartChat
        ) {

            if (builderSubscription.canStartChat) {
                price += 500;
            } else {
                price -= 500;
            }

        }

        return price;

    }

    /**
     * Стоимость одной подписки
     */
    calculateSubscriptionPrice(subscriptionPlan, builderSubscription) {

        let monthPrice = subscriptionPlan.monthPrice;

        if (builderSubscription.isModified) {
            monthPrice = this.calculateModifiedPrice(
                subscriptionPlan,
                builderSubscription
            );
        }

        let totalPrice = this.calculatePeriodPrice(
            monthPrice,
            builderSubscription.periodDays
        );

        totalPrice *= builderSubscription.channelsCount;

        return Math.round(totalPrice);

    }

    /**
     * Общая стоимость конструктора
     */
    calculateBuilderPrice(subscriptions) {

        let total = 0;

        subscriptions.forEach(subscription => {

            total += this.calculateSubscriptionPrice(
                subscription.subscription_plan,
                subscription
            );

        });

        return total;

    }

}

module.exports = new PriceService();