"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageHelper = exports.LocalStorageKey = void 0;
exports.LocalStorageKey = {
    ID: "block_id",
    COMPANY: "company",
};
class LocalStorageHelper {
    static getId() {
        var _a;
        return JSON.parse((_a = localStorage.getItem(exports.LocalStorageKey.ID)) !== null && _a !== void 0 ? _a : '');
    }
    static getCompany() {
        var _a;
        return JSON.parse((_a = localStorage.getItem(exports.LocalStorageKey.COMPANY)) !== null && _a !== void 0 ? _a : '');
    }
}
exports.LocalStorageHelper = LocalStorageHelper;
