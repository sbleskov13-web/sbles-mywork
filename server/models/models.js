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

// User -> Builder

User.hasOne(Builder);
Builder.belongsTo(User);

// User -> Channels

User.hasMany(Channel);
Channel.belongsTo(User);

// Type -> Channels

Type.hasMany(Channel);
Channel.belongsTo(Type);

// Builder -> BuilderSubscription

Builder.hasMany(BuilderSubscription);
BuilderSubscription.belongsTo(Builder);

// Subscription -> BuilderSubscription

Subscription.hasMany(BuilderSubscription);
BuilderSubscription.belongsTo(Subscription);

// Type -> Subscription

Type.hasMany(Subscription);
Subscription.belongsTo(Type);

// Rate -> Subscription

Rate.hasMany(Subscription);
Subscription.belongsTo(Rate);

// Subscription -> SubscriptionInfo

Subscription.hasMany(SubscriptionInfo, {
    as: "info",
});
SubscriptionInfo.belongsTo(Subscription);

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