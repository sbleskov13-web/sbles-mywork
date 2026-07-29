const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// ====================== USER ======================

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

// ====================== BUILDER ======================

const Builder = sequelize.define("builder", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// ====================== CHANNEL ======================

const Channel = sequelize.define("channel", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    externalId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// ====================== BUILDER SUBSCRIPTION ======================

const BuilderSubscription = sequelize.define("builder_subscription", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // true - пользователь изменил параметры
    // false - используется стандартный тариф
    isModified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    // null = использовать лимит тарифа
    dialogs: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    // null = использовать значение тарифа
    canStartChat: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

    // количество дней оплаты
    periodDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30,
    },

    // количество каналов данного типа
    channelsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

// ====================== TYPE ======================

const Type = sequelize.define("type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
});

// ====================== RATE ======================

const Rate = sequelize.define("rate", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
});

// ====================== SUBSCRIPTION ======================

const Subscription = sequelize.define("subscription", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

    // стоимость за месяц
    monthPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // -1 = безлимит
    dialogsLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    canStartChat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// ====================== SUBSCRIPTION INFO ======================

const SubscriptionInfo = sequelize.define("subscription_info", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// ====================== RELATIONS ======================

// ---------- User ----------

User.hasOne(Builder, {
    foreignKey: "userId",
    as: "builder",
});

Builder.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

User.hasMany(Channel, {
    foreignKey: "userId",
    as: "channels",
});

Channel.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// ---------- Subscription Type ----------

SubscriptionType.hasMany(Channel, {
    foreignKey: "subscriptionTypeId",
    as: "channels",
});

Channel.belongsTo(SubscriptionType, {
    foreignKey: "subscriptionTypeId",
    as: "subscriptionType",
});

// ---------- Builder ----------

Builder.hasMany(BuilderSubscription, {
    foreignKey: "builderId",
    as: "subscriptions",
});

BuilderSubscription.belongsTo(Builder, {
    foreignKey: "builderId",
    as: "builder",
});

// ---------- Subscription Plan ----------

SubscriptionType.hasMany(SubscriptionPlan, {
    foreignKey: "subscriptionTypeId",
    as: "subscriptionPlans",
});

SubscriptionPlan.belongsTo(SubscriptionType, {
    foreignKey: "subscriptionTypeId",
    as: "subscriptionType",
});

Rate.hasMany(SubscriptionPlan, {
    foreignKey: "rateId",
    as: "subscriptionPlans",
});

SubscriptionPlan.belongsTo(Rate, {
    foreignKey: "rateId",
    as: "rate",
});

// ---------- Builder Subscription ----------

SubscriptionPlan.hasMany(BuilderSubscription, {
    foreignKey: "subscriptionPlanId",
    as: "builderSubscriptions",
});

BuilderSubscription.belongsTo(SubscriptionPlan, {
    foreignKey: "subscriptionPlanId",
    as: "subscriptionPlan",
});

// ---------- Subscription Info ----------

SubscriptionPlan.hasMany(SubscriptionInfo, {
    foreignKey: "subscriptionPlanId",
    as: "info",
});

SubscriptionInfo.belongsTo(SubscriptionPlan, {
    foreignKey: "subscriptionPlanId",
    as: "subscriptionPlan",
});

module.exports = {
    User,
    Builder,
    BuilderSubscription,
    Channel,
    Type,
    Rate,
    Subscription,
    SubscriptionInfo,
};