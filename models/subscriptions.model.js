import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        maxlength: 100,
        minlength: 6,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be greater than 0"],
        max: [1000, "Price must be less than 1000"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD",
    },
    frequency: {
        type: String, // ✅ Fix here
        enum: ["daily", "weekly", "monthly", "yearly"],
        required: true,
    },
    category: {
        type: String,
        enum: ["sports", "news", "entertainment", "lifestyle", "technology", "finances", "politics", "others"],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "canceled", "expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Date is required"],
        validate: {
            validator: (value) => value < new Date(),
            message: "Start date must be in the past",
        },
        default: Date.now,
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after the start date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true,
    }
}, {
    timestamps: true  // ✅ Moved this outside field definitions
});

//Auto calculate the renewal date if missings
subscriptionSchema.pre("save",function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,

        }
        this.renewalDate=new Date(this.startDate,);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]);
    }
    //Auto update the status if the renewal date is passed
    if(this.renewalDate<new Date()){
        this.status="expired"
    }
    next();
})
const Subscription= mongoose.model("Subscription",subscriptionSchema);
 export default Subscription;