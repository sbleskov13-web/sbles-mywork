// services/builderService.js

const {
    Builder,
    BuilderSubscription,
    SubscriptionPlan,
    SubscriptionType,
    Rate,
} = require("../models/models");

const priceService = require("./priceService");

class BuilderService {

    /**
     * Получить конструктор пользователя
     */
    async getBuilder(userId) {

        const builder = await Builder.findOne({
            where: {
                userId,
            },
        });

        if (!builder) {
            throw new Error("Конструктор не найден");
        }

        const subscriptions = await BuilderSubscription.findAll({

            where: {
                builderId: builder.id,
            },

            include: [
                {
                    model: SubscriptionPlan,
                    include: [
                        SubscriptionType,
                        Rate,
                    ],
                },
            ],

        });

        return subscriptions;

    }

    /**
     * Добавить подписку
     */
    async addSubscription(builderId, data) {

        const subscription = await BuilderSubscription.create({

            builderId,

            subscriptionPlanId: data.subscriptionPlanId,

            isModified: data.isModified ?? false,

            addedDialogs: data.addedDialogs ?? 0,

            canStartChat: data.canStartChat,

            channelsCount: data.channelsCount ?? 1,

            periodDays: data.periodDays ?? 30,

        });

        return subscription;

    }

    /**
     * Обновить подписку
     */
    async updateSubscription(id, data) {

        const subscription = await BuilderSubscription.findByPk(id, {

            include: SubscriptionPlan,

        });

        if (!subscription) {
            throw new Error("Подписка не найдена");
        }

        await subscription.update(data);

        const totalPrice = priceService.calculateSubscriptionPrice(
            subscription.subscription_plan,
            subscription
        );

        await subscription.update({
            totalPrice,
        });

        return subscription;

    }

    /**
     * Удалить подписку
     */
    async removeSubscription(id) {

        const subscription = await BuilderSubscription.findByPk(id);

        if (!subscription) {
            throw new Error("Подписка не найдена");
        }

        await subscription.destroy();

    }

    /**
     * Итоговая стоимость конструктора
     */
    async calculateBuilderPrice(builderId) {

        const subscriptions = await BuilderSubscription.findAll({

            where: {
                builderId,
            },

            include: SubscriptionPlan,

        });

        return priceService.calculateBuilderPrice(subscriptions);

    }

}

module.exports = new BuilderService();