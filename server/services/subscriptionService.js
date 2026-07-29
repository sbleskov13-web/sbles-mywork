// services/subscriptionService.js

const {
    SubscriptionPlan,
    SubscriptionType,
    Rate,
    SubscriptionInfo,
} = require("../models/models");

class SubscriptionService {

    /**
     * Получить все тарифы
     */
    async getAll() {

        return await SubscriptionPlan.findAll({
            include: [
                SubscriptionType,
                Rate,
                {
                    model: SubscriptionInfo,
                    as: "info",
                },
            ],
        });

    }

    /**
     * Получить тариф по id
     */
    async getById(id) {

        return await SubscriptionPlan.findByPk(id, {
            include: [
                SubscriptionType,
                Rate,
                {
                    model: SubscriptionInfo,
                    as: "info",
                },
            ],
        });

    }

    /**
     * Получить тариф по типу и названию
     */
    async getByTypeAndRate(subscriptionTypeId, rateId) {

        return await SubscriptionPlan.findOne({
            where: {
                subscriptionTypeId,
                rateId,
            },
            include: [
                SubscriptionType,
                Rate,
            ],
        });

    }

}

module.exports = new SubscriptionService();