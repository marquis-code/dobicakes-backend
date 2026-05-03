"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentProductSchema = exports.AppointmentProduct = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AppointmentProduct = class AppointmentProduct extends mongoose_2.Document {
    title;
    description;
    price;
    duration;
    availability;
    isActive;
    image;
};
exports.AppointmentProduct = AppointmentProduct;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AppointmentProduct.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AppointmentProduct.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], AppointmentProduct.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 60 }),
    __metadata("design:type", Number)
], AppointmentProduct.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Object }),
    __metadata("design:type", Object)
], AppointmentProduct.prototype, "availability", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], AppointmentProduct.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AppointmentProduct.prototype, "image", void 0);
exports.AppointmentProduct = AppointmentProduct = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AppointmentProduct);
exports.AppointmentProductSchema = mongoose_1.SchemaFactory.createForClass(AppointmentProduct);
//# sourceMappingURL=appointment-product.schema.js.map