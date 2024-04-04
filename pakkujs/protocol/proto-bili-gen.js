/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const bilibili = $root.bilibili = (() => {

    const bilibili = {};

    bilibili.community = (function() {

        const community = {};

        community.service = (function() {

            const service = {};

            service.dm = (function() {

                const dm = {};

                dm.v1 = (function() {

                    const v1 = {};

                    v1.DmWebViewReply = (function() {

                        function DmWebViewReply(properties) {
                            this.specialDms = [];
                            this.commandDms = [];
                            this.reportFilter = [];
                            this.expressions = [];
                            this.postPanel = [];
                            this.activityMetas = [];
                            this.postPanelV2 = [];
                            this.subViews = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        DmWebViewReply.prototype.state = 0;
                        DmWebViewReply.prototype.text = "";
                        DmWebViewReply.prototype.textSide = "";
                        DmWebViewReply.prototype.dmSge = null;
                        DmWebViewReply.prototype.flag = null;
                        DmWebViewReply.prototype.specialDms = $util.emptyArray;
                        DmWebViewReply.prototype.checkBox = false;
                        DmWebViewReply.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DmWebViewReply.prototype.commandDms = $util.emptyArray;
                        DmWebViewReply.prototype.dmSetting = null;
                        DmWebViewReply.prototype.reportFilter = $util.emptyArray;
                        DmWebViewReply.prototype.expressions = $util.emptyArray;
                        DmWebViewReply.prototype.postPanel = $util.emptyArray;
                        DmWebViewReply.prototype.activityMetas = $util.emptyArray;
                        DmWebViewReply.prototype.postPanelV2 = $util.emptyArray;
                        DmWebViewReply.prototype.subViews = $util.emptyArray;
                        DmWebViewReply.prototype.qoe = null;

                        DmWebViewReply.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                                writer.uint32(8).int32(message.state);
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(18).string(message.text);
                            if (message.textSide != null && Object.hasOwnProperty.call(message, "textSide"))
                                writer.uint32(26).string(message.textSide);
                            if (message.dmSge != null && Object.hasOwnProperty.call(message, "dmSge"))
                                $root.bilibili.community.service.dm.v1.DmSegConfig.encode(message.dmSge, writer.uint32(34).fork()).ldelim();
                            if (message.flag != null && Object.hasOwnProperty.call(message, "flag"))
                                $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.encode(message.flag, writer.uint32(42).fork()).ldelim();
                            if (message.specialDms != null && message.specialDms.length)
                                for (let i = 0; i < message.specialDms.length; ++i)
                                    writer.uint32(50).string(message.specialDms[i]);
                            if (message.checkBox != null && Object.hasOwnProperty.call(message, "checkBox"))
                                writer.uint32(56).bool(message.checkBox);
                            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                                writer.uint32(64).int64(message.count);
                            if (message.commandDms != null && message.commandDms.length)
                                for (let i = 0; i < message.commandDms.length; ++i)
                                    $root.bilibili.community.service.dm.v1.CommandDm.encode(message.commandDms[i], writer.uint32(74).fork()).ldelim();
                            if (message.dmSetting != null && Object.hasOwnProperty.call(message, "dmSetting"))
                                $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.encode(message.dmSetting, writer.uint32(82).fork()).ldelim();
                            if (message.reportFilter != null && message.reportFilter.length)
                                for (let i = 0; i < message.reportFilter.length; ++i)
                                    writer.uint32(90).string(message.reportFilter[i]);
                            if (message.expressions != null && message.expressions.length)
                                for (let i = 0; i < message.expressions.length; ++i)
                                    $root.bilibili.community.service.dm.v1.Expressions.encode(message.expressions[i], writer.uint32(98).fork()).ldelim();
                            if (message.postPanel != null && message.postPanel.length)
                                for (let i = 0; i < message.postPanel.length; ++i)
                                    $root.bilibili.community.service.dm.v1.PostPanel.encode(message.postPanel[i], writer.uint32(106).fork()).ldelim();
                            if (message.activityMetas != null && message.activityMetas.length)
                                for (let i = 0; i < message.activityMetas.length; ++i)
                                    writer.uint32(114).string(message.activityMetas[i]);
                            if (message.postPanelV2 != null && message.postPanelV2.length)
                                for (let i = 0; i < message.postPanelV2.length; ++i)
                                    $root.bilibili.community.service.dm.v1.PostPanelV2.encode(message.postPanelV2[i], writer.uint32(122).fork()).ldelim();
                            if (message.subViews != null && message.subViews.length)
                                for (let i = 0; i < message.subViews.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DmSubView.encode(message.subViews[i], writer.uint32(130).fork()).ldelim();
                            if (message.qoe != null && Object.hasOwnProperty.call(message, "qoe"))
                                $root.bilibili.community.service.dm.v1.QoeInfo.encode(message.qoe, writer.uint32(138).fork()).ldelim();
                            return writer;
                        };

                        DmWebViewReply.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmWebViewReply();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.state = reader.int32();
                                        break;
                                    }
                                case 2: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 3: {
                                        message.textSide = reader.string();
                                        break;
                                    }
                                case 4: {
                                        message.dmSge = $root.bilibili.community.service.dm.v1.DmSegConfig.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 5: {
                                        message.flag = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 6: {
                                        if (!(message.specialDms && message.specialDms.length))
                                            message.specialDms = [];
                                        message.specialDms.push(reader.string());
                                        break;
                                    }
                                case 7: {
                                        message.checkBox = reader.bool();
                                        break;
                                    }
                                case 8: {
                                        message.count = reader.int64();
                                        break;
                                    }
                                case 9: {
                                        if (!(message.commandDms && message.commandDms.length))
                                            message.commandDms = [];
                                        message.commandDms.push($root.bilibili.community.service.dm.v1.CommandDm.decode(reader, reader.uint32()));
                                        break;
                                    }
                                case 10: {
                                        message.dmSetting = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 11: {
                                        if (!(message.reportFilter && message.reportFilter.length))
                                            message.reportFilter = [];
                                        message.reportFilter.push(reader.string());
                                        break;
                                    }
                                case 12: {
                                        if (!(message.expressions && message.expressions.length))
                                            message.expressions = [];
                                        message.expressions.push($root.bilibili.community.service.dm.v1.Expressions.decode(reader, reader.uint32()));
                                        break;
                                    }
                                case 13: {
                                        if (!(message.postPanel && message.postPanel.length))
                                            message.postPanel = [];
                                        message.postPanel.push($root.bilibili.community.service.dm.v1.PostPanel.decode(reader, reader.uint32()));
                                        break;
                                    }
                                case 14: {
                                        if (!(message.activityMetas && message.activityMetas.length))
                                            message.activityMetas = [];
                                        message.activityMetas.push(reader.string());
                                        break;
                                    }
                                case 15: {
                                        if (!(message.postPanelV2 && message.postPanelV2.length))
                                            message.postPanelV2 = [];
                                        message.postPanelV2.push($root.bilibili.community.service.dm.v1.PostPanelV2.decode(reader, reader.uint32()));
                                        break;
                                    }
                                case 16: {
                                        if (!(message.subViews && message.subViews.length))
                                            message.subViews = [];
                                        message.subViews.push($root.bilibili.community.service.dm.v1.DmSubView.decode(reader, reader.uint32()));
                                        break;
                                    }
                                case 17: {
                                        message.qoe = $root.bilibili.community.service.dm.v1.QoeInfo.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        DmWebViewReply.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmWebViewReply";
                        };

                        return DmWebViewReply;
                    })();

                    v1.QoeInfo = (function() {

                        function QoeInfo(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        QoeInfo.prototype.info = "";

                        QoeInfo.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                                writer.uint32(10).string(message.info);
                            return writer;
                        };

                        QoeInfo.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.QoeInfo();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.info = reader.string();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        QoeInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.QoeInfo";
                        };

                        return QoeInfo;
                    })();

                    v1.PostPanel = (function() {

                        function PostPanel(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        PostPanel.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanel.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanel.prototype.priority = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanel.prototype.bizId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanel.prototype.bizType = 0;
                        PostPanel.prototype.clickButton = null;
                        PostPanel.prototype.textInput = null;
                        PostPanel.prototype.checkBox = null;
                        PostPanel.prototype.toast = null;

                        PostPanel.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                                writer.uint32(8).int64(message.start);
                            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                                writer.uint32(16).int64(message.end);
                            if (message.priority != null && Object.hasOwnProperty.call(message, "priority"))
                                writer.uint32(24).int64(message.priority);
                            if (message.bizId != null && Object.hasOwnProperty.call(message, "bizId"))
                                writer.uint32(32).int64(message.bizId);
                            if (message.bizType != null && Object.hasOwnProperty.call(message, "bizType"))
                                writer.uint32(40).int32(message.bizType);
                            if (message.clickButton != null && Object.hasOwnProperty.call(message, "clickButton"))
                                $root.bilibili.community.service.dm.v1.ClickButton.encode(message.clickButton, writer.uint32(50).fork()).ldelim();
                            if (message.textInput != null && Object.hasOwnProperty.call(message, "textInput"))
                                $root.bilibili.community.service.dm.v1.TextInput.encode(message.textInput, writer.uint32(58).fork()).ldelim();
                            if (message.checkBox != null && Object.hasOwnProperty.call(message, "checkBox"))
                                $root.bilibili.community.service.dm.v1.CheckBox.encode(message.checkBox, writer.uint32(66).fork()).ldelim();
                            if (message.toast != null && Object.hasOwnProperty.call(message, "toast"))
                                $root.bilibili.community.service.dm.v1.Toast.encode(message.toast, writer.uint32(74).fork()).ldelim();
                            return writer;
                        };

                        PostPanel.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.PostPanel();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.start = reader.int64();
                                        break;
                                    }
                                case 2: {
                                        message.end = reader.int64();
                                        break;
                                    }
                                case 3: {
                                        message.priority = reader.int64();
                                        break;
                                    }
                                case 4: {
                                        message.bizId = reader.int64();
                                        break;
                                    }
                                case 5: {
                                        message.bizType = reader.int32();
                                        break;
                                    }
                                case 6: {
                                        message.clickButton = $root.bilibili.community.service.dm.v1.ClickButton.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 7: {
                                        message.textInput = $root.bilibili.community.service.dm.v1.TextInput.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 8: {
                                        message.checkBox = $root.bilibili.community.service.dm.v1.CheckBox.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 9: {
                                        message.toast = $root.bilibili.community.service.dm.v1.Toast.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        PostPanel.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.PostPanel";
                        };

                        return PostPanel;
                    })();

                    v1.PostPanelV2 = (function() {

                        function PostPanelV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        PostPanelV2.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanelV2.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        PostPanelV2.prototype.bizType = 0;
                        PostPanelV2.prototype.clickButton = null;
                        PostPanelV2.prototype.textInput = null;
                        PostPanelV2.prototype.checkBox = null;
                        PostPanelV2.prototype.toast = null;
                        PostPanelV2.prototype.bubble = null;
                        PostPanelV2.prototype.label = null;
                        PostPanelV2.prototype.postStatus = 0;

                        PostPanelV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                                writer.uint32(8).int64(message.start);
                            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                                writer.uint32(16).int64(message.end);
                            if (message.bizType != null && Object.hasOwnProperty.call(message, "bizType"))
                                writer.uint32(24).int32(message.bizType);
                            if (message.clickButton != null && Object.hasOwnProperty.call(message, "clickButton"))
                                $root.bilibili.community.service.dm.v1.ClickButtonV2.encode(message.clickButton, writer.uint32(34).fork()).ldelim();
                            if (message.textInput != null && Object.hasOwnProperty.call(message, "textInput"))
                                $root.bilibili.community.service.dm.v1.TextInputV2.encode(message.textInput, writer.uint32(42).fork()).ldelim();
                            if (message.checkBox != null && Object.hasOwnProperty.call(message, "checkBox"))
                                $root.bilibili.community.service.dm.v1.CheckBoxV2.encode(message.checkBox, writer.uint32(50).fork()).ldelim();
                            if (message.toast != null && Object.hasOwnProperty.call(message, "toast"))
                                $root.bilibili.community.service.dm.v1.ToastV2.encode(message.toast, writer.uint32(58).fork()).ldelim();
                            if (message.bubble != null && Object.hasOwnProperty.call(message, "bubble"))
                                $root.bilibili.community.service.dm.v1.BubbleV2.encode(message.bubble, writer.uint32(66).fork()).ldelim();
                            if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                                $root.bilibili.community.service.dm.v1.LabelV2.encode(message.label, writer.uint32(74).fork()).ldelim();
                            if (message.postStatus != null && Object.hasOwnProperty.call(message, "postStatus"))
                                writer.uint32(80).int32(message.postStatus);
                            return writer;
                        };

                        PostPanelV2.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.PostPanelV2();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.start = reader.int64();
                                        break;
                                    }
                                case 2: {
                                        message.end = reader.int64();
                                        break;
                                    }
                                case 3: {
                                        message.bizType = reader.int32();
                                        break;
                                    }
                                case 4: {
                                        message.clickButton = $root.bilibili.community.service.dm.v1.ClickButtonV2.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 5: {
                                        message.textInput = $root.bilibili.community.service.dm.v1.TextInputV2.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 6: {
                                        message.checkBox = $root.bilibili.community.service.dm.v1.CheckBoxV2.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 7: {
                                        message.toast = $root.bilibili.community.service.dm.v1.ToastV2.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 8: {
                                        message.bubble = $root.bilibili.community.service.dm.v1.BubbleV2.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 9: {
                                        message.label = $root.bilibili.community.service.dm.v1.LabelV2.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 10: {
                                        message.postStatus = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        PostPanelV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.PostPanelV2";
                        };

                        return PostPanelV2;
                    })();

                    v1.ClickButton = (function() {

                        function ClickButton(properties) {
                            this.portraitText = [];
                            this.landscapeText = [];
                            this.portraitTextFocus = [];
                            this.landscapeTextFocus = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        ClickButton.prototype.portraitText = $util.emptyArray;
                        ClickButton.prototype.landscapeText = $util.emptyArray;
                        ClickButton.prototype.portraitTextFocus = $util.emptyArray;
                        ClickButton.prototype.landscapeTextFocus = $util.emptyArray;
                        ClickButton.prototype.renderType = 0;
                        ClickButton.prototype.show = false;

                        ClickButton.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.portraitText != null && message.portraitText.length)
                                for (let i = 0; i < message.portraitText.length; ++i)
                                    writer.uint32(10).string(message.portraitText[i]);
                            if (message.landscapeText != null && message.landscapeText.length)
                                for (let i = 0; i < message.landscapeText.length; ++i)
                                    writer.uint32(18).string(message.landscapeText[i]);
                            if (message.portraitTextFocus != null && message.portraitTextFocus.length)
                                for (let i = 0; i < message.portraitTextFocus.length; ++i)
                                    writer.uint32(26).string(message.portraitTextFocus[i]);
                            if (message.landscapeTextFocus != null && message.landscapeTextFocus.length)
                                for (let i = 0; i < message.landscapeTextFocus.length; ++i)
                                    writer.uint32(34).string(message.landscapeTextFocus[i]);
                            if (message.renderType != null && Object.hasOwnProperty.call(message, "renderType"))
                                writer.uint32(40).int32(message.renderType);
                            if (message.show != null && Object.hasOwnProperty.call(message, "show"))
                                writer.uint32(48).bool(message.show);
                            return writer;
                        };

                        ClickButton.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.ClickButton();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.portraitText && message.portraitText.length))
                                            message.portraitText = [];
                                        message.portraitText.push(reader.string());
                                        break;
                                    }
                                case 2: {
                                        if (!(message.landscapeText && message.landscapeText.length))
                                            message.landscapeText = [];
                                        message.landscapeText.push(reader.string());
                                        break;
                                    }
                                case 3: {
                                        if (!(message.portraitTextFocus && message.portraitTextFocus.length))
                                            message.portraitTextFocus = [];
                                        message.portraitTextFocus.push(reader.string());
                                        break;
                                    }
                                case 4: {
                                        if (!(message.landscapeTextFocus && message.landscapeTextFocus.length))
                                            message.landscapeTextFocus = [];
                                        message.landscapeTextFocus.push(reader.string());
                                        break;
                                    }
                                case 5: {
                                        message.renderType = reader.int32();
                                        break;
                                    }
                                case 6: {
                                        message.show = reader.bool();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        ClickButton.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.ClickButton";
                        };

                        return ClickButton;
                    })();

                    v1.ClickButtonV2 = (function() {

                        function ClickButtonV2(properties) {
                            this.portraitText = [];
                            this.landscapeText = [];
                            this.portraitTextFocus = [];
                            this.landscapeTextFocus = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        ClickButtonV2.prototype.portraitText = $util.emptyArray;
                        ClickButtonV2.prototype.landscapeText = $util.emptyArray;
                        ClickButtonV2.prototype.portraitTextFocus = $util.emptyArray;
                        ClickButtonV2.prototype.landscapeTextFocus = $util.emptyArray;
                        ClickButtonV2.prototype.renderType = 0;
                        ClickButtonV2.prototype.textInputPost = false;
                        ClickButtonV2.prototype.exposureOnce = false;
                        ClickButtonV2.prototype.exposureType = 0;

                        ClickButtonV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.portraitText != null && message.portraitText.length)
                                for (let i = 0; i < message.portraitText.length; ++i)
                                    writer.uint32(10).string(message.portraitText[i]);
                            if (message.landscapeText != null && message.landscapeText.length)
                                for (let i = 0; i < message.landscapeText.length; ++i)
                                    writer.uint32(18).string(message.landscapeText[i]);
                            if (message.portraitTextFocus != null && message.portraitTextFocus.length)
                                for (let i = 0; i < message.portraitTextFocus.length; ++i)
                                    writer.uint32(26).string(message.portraitTextFocus[i]);
                            if (message.landscapeTextFocus != null && message.landscapeTextFocus.length)
                                for (let i = 0; i < message.landscapeTextFocus.length; ++i)
                                    writer.uint32(34).string(message.landscapeTextFocus[i]);
                            if (message.renderType != null && Object.hasOwnProperty.call(message, "renderType"))
                                writer.uint32(40).int32(message.renderType);
                            if (message.textInputPost != null && Object.hasOwnProperty.call(message, "textInputPost"))
                                writer.uint32(48).bool(message.textInputPost);
                            if (message.exposureOnce != null && Object.hasOwnProperty.call(message, "exposureOnce"))
                                writer.uint32(56).bool(message.exposureOnce);
                            if (message.exposureType != null && Object.hasOwnProperty.call(message, "exposureType"))
                                writer.uint32(64).int32(message.exposureType);
                            return writer;
                        };

                        ClickButtonV2.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.ClickButtonV2();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.portraitText && message.portraitText.length))
                                            message.portraitText = [];
                                        message.portraitText.push(reader.string());
                                        break;
                                    }
                                case 2: {
                                        if (!(message.landscapeText && message.landscapeText.length))
                                            message.landscapeText = [];
                                        message.landscapeText.push(reader.string());
                                        break;
                                    }
                                case 3: {
                                        if (!(message.portraitTextFocus && message.portraitTextFocus.length))
                                            message.portraitTextFocus = [];
                                        message.portraitTextFocus.push(reader.string());
                                        break;
                                    }
                                case 4: {
                                        if (!(message.landscapeTextFocus && message.landscapeTextFocus.length))
                                            message.landscapeTextFocus = [];
                                        message.landscapeTextFocus.push(reader.string());
                                        break;
                                    }
                                case 5: {
                                        message.renderType = reader.int32();
                                        break;
                                    }
                                case 6: {
                                        message.textInputPost = reader.bool();
                                        break;
                                    }
                                case 7: {
                                        message.exposureOnce = reader.bool();
                                        break;
                                    }
                                case 8: {
                                        message.exposureType = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        ClickButtonV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.ClickButtonV2";
                        };

                        return ClickButtonV2;
                    })();

                    v1.PostPanelBizType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "PostPanelBizTypeNone"] = 0;
                        values[valuesById[1] = "PostPanelBizTypeEncourage"] = 1;
                        values[valuesById[4] = "PostPanelBizTypeFragClose"] = 4;
                        values[valuesById[2] = "PostPanelBizTypeColorDM"] = 2;
                        return values;
                    })();

                    v1.TextInput = (function() {

                        function TextInput(properties) {
                            this.portraitPlaceholder = [];
                            this.landscapePlaceholder = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        TextInput.prototype.portraitPlaceholder = $util.emptyArray;
                        TextInput.prototype.landscapePlaceholder = $util.emptyArray;
                        TextInput.prototype.renderType = 0;
                        TextInput.prototype.placeholderPost = false;
                        TextInput.prototype.show = false;
                        TextInput.prototype.postStatus = 0;

                        TextInput.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.portraitPlaceholder != null && message.portraitPlaceholder.length)
                                for (let i = 0; i < message.portraitPlaceholder.length; ++i)
                                    writer.uint32(10).string(message.portraitPlaceholder[i]);
                            if (message.landscapePlaceholder != null && message.landscapePlaceholder.length)
                                for (let i = 0; i < message.landscapePlaceholder.length; ++i)
                                    writer.uint32(18).string(message.landscapePlaceholder[i]);
                            if (message.renderType != null && Object.hasOwnProperty.call(message, "renderType"))
                                writer.uint32(24).int32(message.renderType);
                            if (message.placeholderPost != null && Object.hasOwnProperty.call(message, "placeholderPost"))
                                writer.uint32(32).bool(message.placeholderPost);
                            if (message.show != null && Object.hasOwnProperty.call(message, "show"))
                                writer.uint32(40).bool(message.show);
                            if (message.postStatus != null && Object.hasOwnProperty.call(message, "postStatus"))
                                writer.uint32(56).int32(message.postStatus);
                            return writer;
                        };

                        TextInput.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.TextInput();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.portraitPlaceholder && message.portraitPlaceholder.length))
                                            message.portraitPlaceholder = [];
                                        message.portraitPlaceholder.push(reader.string());
                                        break;
                                    }
                                case 2: {
                                        if (!(message.landscapePlaceholder && message.landscapePlaceholder.length))
                                            message.landscapePlaceholder = [];
                                        message.landscapePlaceholder.push(reader.string());
                                        break;
                                    }
                                case 3: {
                                        message.renderType = reader.int32();
                                        break;
                                    }
                                case 4: {
                                        message.placeholderPost = reader.bool();
                                        break;
                                    }
                                case 5: {
                                        message.show = reader.bool();
                                        break;
                                    }
                                case 7: {
                                        message.postStatus = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        TextInput.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.TextInput";
                        };

                        return TextInput;
                    })();

                    v1.TextInputV2 = (function() {

                        function TextInputV2(properties) {
                            this.portraitPlaceholder = [];
                            this.landscapePlaceholder = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        TextInputV2.prototype.portraitPlaceholder = $util.emptyArray;
                        TextInputV2.prototype.landscapePlaceholder = $util.emptyArray;
                        TextInputV2.prototype.renderType = 0;
                        TextInputV2.prototype.placeholderPost = false;
                        TextInputV2.prototype.textInputLimit = 0;

                        TextInputV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.portraitPlaceholder != null && message.portraitPlaceholder.length)
                                for (let i = 0; i < message.portraitPlaceholder.length; ++i)
                                    writer.uint32(10).string(message.portraitPlaceholder[i]);
                            if (message.landscapePlaceholder != null && message.landscapePlaceholder.length)
                                for (let i = 0; i < message.landscapePlaceholder.length; ++i)
                                    writer.uint32(18).string(message.landscapePlaceholder[i]);
                            if (message.renderType != null && Object.hasOwnProperty.call(message, "renderType"))
                                writer.uint32(24).int32(message.renderType);
                            if (message.placeholderPost != null && Object.hasOwnProperty.call(message, "placeholderPost"))
                                writer.uint32(32).bool(message.placeholderPost);
                            if (message.textInputLimit != null && Object.hasOwnProperty.call(message, "textInputLimit"))
                                writer.uint32(48).int32(message.textInputLimit);
                            return writer;
                        };

                        TextInputV2.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.TextInputV2();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.portraitPlaceholder && message.portraitPlaceholder.length))
                                            message.portraitPlaceholder = [];
                                        message.portraitPlaceholder.push(reader.string());
                                        break;
                                    }
                                case 2: {
                                        if (!(message.landscapePlaceholder && message.landscapePlaceholder.length))
                                            message.landscapePlaceholder = [];
                                        message.landscapePlaceholder.push(reader.string());
                                        break;
                                    }
                                case 3: {
                                        message.renderType = reader.int32();
                                        break;
                                    }
                                case 4: {
                                        message.placeholderPost = reader.bool();
                                        break;
                                    }
                                case 6: {
                                        message.textInputLimit = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        TextInputV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.TextInputV2";
                        };

                        return TextInputV2;
                    })();

                    v1.PostStatus = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "PostStatusNormal"] = 0;
                        values[valuesById[1] = "PostStatusClosed"] = 1;
                        return values;
                    })();

                    v1.RenderType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "RenderTypeNone"] = 0;
                        values[valuesById[1] = "RenderTypeSingle"] = 1;
                        values[valuesById[2] = "RenderTypeRotation"] = 2;
                        return values;
                    })();

                    v1.CheckBox = (function() {

                        function CheckBox(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        CheckBox.prototype.text = "";
                        CheckBox.prototype.type = 0;
                        CheckBox.prototype.defaultValue = false;
                        CheckBox.prototype.show = false;

                        CheckBox.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(10).string(message.text);
                            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                writer.uint32(16).int32(message.type);
                            if (message.defaultValue != null && Object.hasOwnProperty.call(message, "defaultValue"))
                                writer.uint32(24).bool(message.defaultValue);
                            if (message.show != null && Object.hasOwnProperty.call(message, "show"))
                                writer.uint32(32).bool(message.show);
                            return writer;
                        };

                        CheckBox.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.CheckBox();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 2: {
                                        message.type = reader.int32();
                                        break;
                                    }
                                case 3: {
                                        message.defaultValue = reader.bool();
                                        break;
                                    }
                                case 4: {
                                        message.show = reader.bool();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        CheckBox.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.CheckBox";
                        };

                        return CheckBox;
                    })();

                    v1.CheckBoxV2 = (function() {

                        function CheckBoxV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        CheckBoxV2.prototype.text = "";
                        CheckBoxV2.prototype.type = 0;
                        CheckBoxV2.prototype.defaultValue = false;

                        CheckBoxV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(10).string(message.text);
                            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                writer.uint32(16).int32(message.type);
                            if (message.defaultValue != null && Object.hasOwnProperty.call(message, "defaultValue"))
                                writer.uint32(24).bool(message.defaultValue);
                            return writer;
                        };

                        CheckBoxV2.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.CheckBoxV2();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 2: {
                                        message.type = reader.int32();
                                        break;
                                    }
                                case 3: {
                                        message.defaultValue = reader.bool();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        CheckBoxV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.CheckBoxV2";
                        };

                        return CheckBoxV2;
                    })();

                    v1.CheckboxType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "CheckboxTypeNone"] = 0;
                        values[valuesById[1] = "CheckboxTypeEncourage"] = 1;
                        return values;
                    })();

                    v1.Toast = (function() {

                        function Toast(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        Toast.prototype.text = "";
                        Toast.prototype.duration = 0;
                        Toast.prototype.show = false;
                        Toast.prototype.button = null;

                        Toast.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(10).string(message.text);
                            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                                writer.uint32(16).int32(message.duration);
                            if (message.show != null && Object.hasOwnProperty.call(message, "show"))
                                writer.uint32(24).bool(message.show);
                            if (message.button != null && Object.hasOwnProperty.call(message, "button"))
                                $root.bilibili.community.service.dm.v1.Button.encode(message.button, writer.uint32(34).fork()).ldelim();
                            return writer;
                        };

                        Toast.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.Toast();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 2: {
                                        message.duration = reader.int32();
                                        break;
                                    }
                                case 3: {
                                        message.show = reader.bool();
                                        break;
                                    }
                                case 4: {
                                        message.button = $root.bilibili.community.service.dm.v1.Button.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        Toast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Toast";
                        };

                        return Toast;
                    })();

                    v1.ToastV2 = (function() {

                        function ToastV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        ToastV2.prototype.text = "";
                        ToastV2.prototype.duration = 0;
                        ToastV2.prototype.toastButtonV2 = null;

                        ToastV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(10).string(message.text);
                            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                                writer.uint32(16).int32(message.duration);
                            if (message.toastButtonV2 != null && Object.hasOwnProperty.call(message, "toastButtonV2"))
                                $root.bilibili.community.service.dm.v1.ToastButtonV2.encode(message.toastButtonV2, writer.uint32(26).fork()).ldelim();
                            return writer;
                        };

                        ToastV2.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.ToastV2();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 2: {
                                        message.duration = reader.int32();
                                        break;
                                    }
                                case 3: {
                                        message.toastButtonV2 = $root.bilibili.community.service.dm.v1.ToastButtonV2.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        ToastV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.ToastV2";
                        };

                        return ToastV2;
                    })();

                    v1.BubbleV2 = (function() {

                        function BubbleV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        BubbleV2.prototype.text = "";
                        BubbleV2.prototype.url = "";
                        BubbleV2.prototype.bubbleType = 0;
                        BubbleV2.prototype.exposureOnce = false;
                        BubbleV2.prototype.exposureType = 0;

                        BubbleV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(10).string(message.text);
                            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                                writer.uint32(18).string(message.url);
                            if (message.bubbleType != null && Object.hasOwnProperty.call(message, "bubbleType"))
                                writer.uint32(24).int32(message.bubbleType);
                            if (message.exposureOnce != null && Object.hasOwnProperty.call(message, "exposureOnce"))
                                writer.uint32(32).bool(message.exposureOnce);
                            if (message.exposureType != null && Object.hasOwnProperty.call(message, "exposureType"))
                                writer.uint32(40).int32(message.exposureType);
                            return writer;
                        };

                        BubbleV2.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.BubbleV2();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 2: {
                                        message.url = reader.string();
                                        break;
                                    }
                                case 3: {
                                        message.bubbleType = reader.int32();
                                        break;
                                    }
                                case 4: {
                                        message.exposureOnce = reader.bool();
                                        break;
                                    }
                                case 5: {
                                        message.exposureType = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        BubbleV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.BubbleV2";
                        };

                        return BubbleV2;
                    })();

                    v1.BubbleType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "BubbleTypeNone"] = 0;
                        values[valuesById[1] = "BubbleTypeClickButton"] = 1;
                        values[valuesById[2] = "BubbleTypeDmSettingPanel"] = 2;
                        return values;
                    })();

                    v1.LabelV2 = (function() {

                        function LabelV2(properties) {
                            this.content = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        LabelV2.prototype.title = "";
                        LabelV2.prototype.content = $util.emptyArray;
                        LabelV2.prototype.exposureOnce = false;
                        LabelV2.prototype.exposureType = 0;

                        LabelV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                                writer.uint32(10).string(message.title);
                            if (message.content != null && message.content.length)
                                for (let i = 0; i < message.content.length; ++i)
                                    writer.uint32(18).string(message.content[i]);
                            if (message.exposureOnce != null && Object.hasOwnProperty.call(message, "exposureOnce"))
                                writer.uint32(24).bool(message.exposureOnce);
                            if (message.exposureType != null && Object.hasOwnProperty.call(message, "exposureType"))
                                writer.uint32(32).int32(message.exposureType);
                            return writer;
                        };

                        LabelV2.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.LabelV2();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.title = reader.string();
                                        break;
                                    }
                                case 2: {
                                        if (!(message.content && message.content.length))
                                            message.content = [];
                                        message.content.push(reader.string());
                                        break;
                                    }
                                case 3: {
                                        message.exposureOnce = reader.bool();
                                        break;
                                    }
                                case 4: {
                                        message.exposureType = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        LabelV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.LabelV2";
                        };

                        return LabelV2;
                    })();

                    v1.ExposureType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "ExposureTypeNone"] = 0;
                        values[valuesById[1] = "ExposureTypeDMSend"] = 1;
                        return values;
                    })();

                    v1.ToastButtonV2 = (function() {

                        function ToastButtonV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        ToastButtonV2.prototype.text = "";
                        ToastButtonV2.prototype.action = 0;

                        ToastButtonV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(10).string(message.text);
                            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                                writer.uint32(16).int32(message.action);
                            return writer;
                        };

                        ToastButtonV2.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.ToastButtonV2();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 2: {
                                        message.action = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        ToastButtonV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.ToastButtonV2";
                        };

                        return ToastButtonV2;
                    })();

                    v1.Button = (function() {

                        function Button(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        Button.prototype.text = "";
                        Button.prototype.action = 0;

                        Button.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(10).string(message.text);
                            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                                writer.uint32(16).int32(message.action);
                            return writer;
                        };

                        Button.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.Button();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 2: {
                                        message.action = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        Button.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Button";
                        };

                        return Button;
                    })();

                    v1.ToastFunctionType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "ToastFunctionTypeNone"] = 0;
                        values[valuesById[1] = "ToastFunctionTypePostPanel"] = 1;
                        return values;
                    })();

                    v1.ToastBizType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "ToastBizTypeNone"] = 0;
                        values[valuesById[1] = "ToastBizTypeEncourage"] = 1;
                        return values;
                    })();

                    v1.CommandDm = (function() {

                        function CommandDm(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        CommandDm.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        CommandDm.prototype.mid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        CommandDm.prototype.command = "";
                        CommandDm.prototype.text = "";
                        CommandDm.prototype.stime = 0;
                        CommandDm.prototype.ctime = "";
                        CommandDm.prototype.mtime = "";
                        CommandDm.prototype.extra = "";
                        CommandDm.prototype.dmid = "";

                        CommandDm.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.oid != null && Object.hasOwnProperty.call(message, "oid"))
                                writer.uint32(16).int64(message.oid);
                            if (message.mid != null && Object.hasOwnProperty.call(message, "mid"))
                                writer.uint32(24).int64(message.mid);
                            if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                                writer.uint32(34).string(message.command);
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(42).string(message.text);
                            if (message.stime != null && Object.hasOwnProperty.call(message, "stime"))
                                writer.uint32(48).int32(message.stime);
                            if (message.ctime != null && Object.hasOwnProperty.call(message, "ctime"))
                                writer.uint32(58).string(message.ctime);
                            if (message.mtime != null && Object.hasOwnProperty.call(message, "mtime"))
                                writer.uint32(66).string(message.mtime);
                            if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
                                writer.uint32(74).string(message.extra);
                            if (message.dmid != null && Object.hasOwnProperty.call(message, "dmid"))
                                writer.uint32(82).string(message.dmid);
                            return writer;
                        };

                        CommandDm.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.CommandDm();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 2: {
                                        message.oid = reader.int64();
                                        break;
                                    }
                                case 3: {
                                        message.mid = reader.int64();
                                        break;
                                    }
                                case 4: {
                                        message.command = reader.string();
                                        break;
                                    }
                                case 5: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 6: {
                                        message.stime = reader.int32();
                                        break;
                                    }
                                case 7: {
                                        message.ctime = reader.string();
                                        break;
                                    }
                                case 8: {
                                        message.mtime = reader.string();
                                        break;
                                    }
                                case 9: {
                                        message.extra = reader.string();
                                        break;
                                    }
                                case 10: {
                                        message.dmid = reader.string();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        CommandDm.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.CommandDm";
                        };

                        return CommandDm;
                    })();

                    v1.DmSegConfig = (function() {

                        function DmSegConfig(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        DmSegConfig.prototype.pageSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DmSegConfig.prototype.total = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        DmSegConfig.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.pageSize != null && Object.hasOwnProperty.call(message, "pageSize"))
                                writer.uint32(8).int64(message.pageSize);
                            if (message.total != null && Object.hasOwnProperty.call(message, "total"))
                                writer.uint32(16).int64(message.total);
                            return writer;
                        };

                        DmSegConfig.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmSegConfig();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.pageSize = reader.int64();
                                        break;
                                    }
                                case 2: {
                                        message.total = reader.int64();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        DmSegConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmSegConfig";
                        };

                        return DmSegConfig;
                    })();

                    v1.DanmakuFlagConfig = (function() {

                        function DanmakuFlagConfig(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        DanmakuFlagConfig.prototype.recFlag = 0;
                        DanmakuFlagConfig.prototype.recText = "";
                        DanmakuFlagConfig.prototype.recSwitch = 0;

                        DanmakuFlagConfig.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.recFlag != null && Object.hasOwnProperty.call(message, "recFlag"))
                                writer.uint32(8).int32(message.recFlag);
                            if (message.recText != null && Object.hasOwnProperty.call(message, "recText"))
                                writer.uint32(18).string(message.recText);
                            if (message.recSwitch != null && Object.hasOwnProperty.call(message, "recSwitch"))
                                writer.uint32(24).int32(message.recSwitch);
                            return writer;
                        };

                        DanmakuFlagConfig.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DanmakuFlagConfig();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.recFlag = reader.int32();
                                        break;
                                    }
                                case 2: {
                                        message.recText = reader.string();
                                        break;
                                    }
                                case 3: {
                                        message.recSwitch = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        DanmakuFlagConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmakuFlagConfig";
                        };

                        return DanmakuFlagConfig;
                    })();

                    v1.DmSegMobileReply = (function() {

                        function DmSegMobileReply(properties) {
                            this.elems = [];
                            this.colorfulSrc = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        DmSegMobileReply.prototype.elems = $util.emptyArray;
                        DmSegMobileReply.prototype.colorfulSrc = $util.emptyArray;

                        DmSegMobileReply.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.elems != null && message.elems.length)
                                for (let i = 0; i < message.elems.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DanmakuElem.encode(message.elems[i], writer.uint32(10).fork()).ldelim();
                            if (message.colorfulSrc != null && message.colorfulSrc.length)
                                for (let i = 0; i < message.colorfulSrc.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DmColorful.encode(message.colorfulSrc[i], writer.uint32(42).fork()).ldelim();
                            return writer;
                        };

                        DmSegMobileReply.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmSegMobileReply();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.elems && message.elems.length))
                                            message.elems = [];
                                        message.elems.push($root.bilibili.community.service.dm.v1.DanmakuElem.decode(reader, reader.uint32()));
                                        break;
                                    }
                                case 5: {
                                        if (!(message.colorfulSrc && message.colorfulSrc.length))
                                            message.colorfulSrc = [];
                                        message.colorfulSrc.push($root.bilibili.community.service.dm.v1.DmColorful.decode(reader, reader.uint32()));
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        DmSegMobileReply.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmSegMobileReply";
                        };

                        return DmSegMobileReply;
                    })();

                    v1.DanmakuElem = (function() {

                        function DanmakuElem(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        DanmakuElem.prototype.stime = 0;
                        DanmakuElem.prototype.mode = 0;
                        DanmakuElem.prototype.size = 0;
                        DanmakuElem.prototype.color = 0;
                        DanmakuElem.prototype.uhash = "";
                        DanmakuElem.prototype.text = "";
                        DanmakuElem.prototype.date = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DanmakuElem.prototype.weight = 0;
                        DanmakuElem.prototype.action = "";
                        DanmakuElem.prototype.pool = 0;
                        DanmakuElem.prototype.dmid = "";
                        DanmakuElem.prototype.attr = 0;
                        DanmakuElem.prototype.animation = "";
                        DanmakuElem.prototype.colorful = 0;
                        DanmakuElem.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        DanmakuElem.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.stime != null && Object.hasOwnProperty.call(message, "stime"))
                                writer.uint32(16).int32(message.stime);
                            if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                                writer.uint32(24).int32(message.mode);
                            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                                writer.uint32(32).int32(message.size);
                            if (message.color != null && Object.hasOwnProperty.call(message, "color"))
                                writer.uint32(40).uint32(message.color);
                            if (message.uhash != null && Object.hasOwnProperty.call(message, "uhash"))
                                writer.uint32(50).string(message.uhash);
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(58).string(message.text);
                            if (message.date != null && Object.hasOwnProperty.call(message, "date"))
                                writer.uint32(64).int64(message.date);
                            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                                writer.uint32(72).int32(message.weight);
                            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                                writer.uint32(82).string(message.action);
                            if (message.pool != null && Object.hasOwnProperty.call(message, "pool"))
                                writer.uint32(88).int32(message.pool);
                            if (message.dmid != null && Object.hasOwnProperty.call(message, "dmid"))
                                writer.uint32(98).string(message.dmid);
                            if (message.attr != null && Object.hasOwnProperty.call(message, "attr"))
                                writer.uint32(104).int32(message.attr);
                            if (message.animation != null && Object.hasOwnProperty.call(message, "animation"))
                                writer.uint32(178).string(message.animation);
                            if (message.colorful != null && Object.hasOwnProperty.call(message, "colorful"))
                                writer.uint32(192).int32(message.colorful);
                            if (message.oid != null && Object.hasOwnProperty.call(message, "oid"))
                                writer.uint32(208).int64(message.oid);
                            return writer;
                        };

                        DanmakuElem.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DanmakuElem();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 2: {
                                        message.stime = reader.int32();
                                        break;
                                    }
                                case 3: {
                                        message.mode = reader.int32();
                                        break;
                                    }
                                case 4: {
                                        message.size = reader.int32();
                                        break;
                                    }
                                case 5: {
                                        message.color = reader.uint32();
                                        break;
                                    }
                                case 6: {
                                        message.uhash = reader.string();
                                        break;
                                    }
                                case 7: {
                                        message.text = reader.string();
                                        break;
                                    }
                                case 8: {
                                        message.date = reader.int64();
                                        break;
                                    }
                                case 9: {
                                        message.weight = reader.int32();
                                        break;
                                    }
                                case 10: {
                                        message.action = reader.string();
                                        break;
                                    }
                                case 11: {
                                        message.pool = reader.int32();
                                        break;
                                    }
                                case 12: {
                                        message.dmid = reader.string();
                                        break;
                                    }
                                case 13: {
                                        message.attr = reader.int32();
                                        break;
                                    }
                                case 22: {
                                        message.animation = reader.string();
                                        break;
                                    }
                                case 24: {
                                        message.colorful = reader.int32();
                                        break;
                                    }
                                case 26: {
                                        message.oid = reader.int64();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        DanmakuElem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmakuElem";
                        };

                        return DanmakuElem;
                    })();

                    v1.DanmuWebPlayerConfig = (function() {

                        function DanmuWebPlayerConfig(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        DanmuWebPlayerConfig.prototype.dmSwitch = false;
                        DanmuWebPlayerConfig.prototype.aiSwitch = false;
                        DanmuWebPlayerConfig.prototype.aiLevel = 0;
                        DanmuWebPlayerConfig.prototype.typeTop = false;
                        DanmuWebPlayerConfig.prototype.typeScroll = false;
                        DanmuWebPlayerConfig.prototype.typeBottom = false;
                        DanmuWebPlayerConfig.prototype.typeColor = false;
                        DanmuWebPlayerConfig.prototype.typeSpecial = false;
                        DanmuWebPlayerConfig.prototype.preventshade = false;
                        DanmuWebPlayerConfig.prototype.dmask = false;
                        DanmuWebPlayerConfig.prototype.opacity = 0;
                        DanmuWebPlayerConfig.prototype.dmarea = 0;
                        DanmuWebPlayerConfig.prototype.speedplus = 0;
                        DanmuWebPlayerConfig.prototype.fontsize = 0;
                        DanmuWebPlayerConfig.prototype.fullscreensync = false;
                        DanmuWebPlayerConfig.prototype.speedsync = false;
                        DanmuWebPlayerConfig.prototype.fontfamily = "";
                        DanmuWebPlayerConfig.prototype.bold = false;
                        DanmuWebPlayerConfig.prototype.fontborder = 0;
                        DanmuWebPlayerConfig.prototype.seniorModeSwitch = 0;

                        DanmuWebPlayerConfig.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.dmSwitch != null && Object.hasOwnProperty.call(message, "dmSwitch"))
                                writer.uint32(8).bool(message.dmSwitch);
                            if (message.aiSwitch != null && Object.hasOwnProperty.call(message, "aiSwitch"))
                                writer.uint32(16).bool(message.aiSwitch);
                            if (message.aiLevel != null && Object.hasOwnProperty.call(message, "aiLevel"))
                                writer.uint32(24).int32(message.aiLevel);
                            if (message.typeTop != null && Object.hasOwnProperty.call(message, "typeTop"))
                                writer.uint32(32).bool(message.typeTop);
                            if (message.typeScroll != null && Object.hasOwnProperty.call(message, "typeScroll"))
                                writer.uint32(40).bool(message.typeScroll);
                            if (message.typeBottom != null && Object.hasOwnProperty.call(message, "typeBottom"))
                                writer.uint32(48).bool(message.typeBottom);
                            if (message.typeColor != null && Object.hasOwnProperty.call(message, "typeColor"))
                                writer.uint32(56).bool(message.typeColor);
                            if (message.typeSpecial != null && Object.hasOwnProperty.call(message, "typeSpecial"))
                                writer.uint32(64).bool(message.typeSpecial);
                            if (message.preventshade != null && Object.hasOwnProperty.call(message, "preventshade"))
                                writer.uint32(72).bool(message.preventshade);
                            if (message.dmask != null && Object.hasOwnProperty.call(message, "dmask"))
                                writer.uint32(80).bool(message.dmask);
                            if (message.opacity != null && Object.hasOwnProperty.call(message, "opacity"))
                                writer.uint32(93).float(message.opacity);
                            if (message.dmarea != null && Object.hasOwnProperty.call(message, "dmarea"))
                                writer.uint32(96).int32(message.dmarea);
                            if (message.speedplus != null && Object.hasOwnProperty.call(message, "speedplus"))
                                writer.uint32(109).float(message.speedplus);
                            if (message.fontsize != null && Object.hasOwnProperty.call(message, "fontsize"))
                                writer.uint32(117).float(message.fontsize);
                            if (message.fullscreensync != null && Object.hasOwnProperty.call(message, "fullscreensync"))
                                writer.uint32(120).bool(message.fullscreensync);
                            if (message.speedsync != null && Object.hasOwnProperty.call(message, "speedsync"))
                                writer.uint32(128).bool(message.speedsync);
                            if (message.fontfamily != null && Object.hasOwnProperty.call(message, "fontfamily"))
                                writer.uint32(138).string(message.fontfamily);
                            if (message.bold != null && Object.hasOwnProperty.call(message, "bold"))
                                writer.uint32(144).bool(message.bold);
                            if (message.fontborder != null && Object.hasOwnProperty.call(message, "fontborder"))
                                writer.uint32(152).int32(message.fontborder);
                            if (message.seniorModeSwitch != null && Object.hasOwnProperty.call(message, "seniorModeSwitch"))
                                writer.uint32(168).int32(message.seniorModeSwitch);
                            return writer;
                        };

                        DanmuWebPlayerConfig.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.dmSwitch = reader.bool();
                                        break;
                                    }
                                case 2: {
                                        message.aiSwitch = reader.bool();
                                        break;
                                    }
                                case 3: {
                                        message.aiLevel = reader.int32();
                                        break;
                                    }
                                case 4: {
                                        message.typeTop = reader.bool();
                                        break;
                                    }
                                case 5: {
                                        message.typeScroll = reader.bool();
                                        break;
                                    }
                                case 6: {
                                        message.typeBottom = reader.bool();
                                        break;
                                    }
                                case 7: {
                                        message.typeColor = reader.bool();
                                        break;
                                    }
                                case 8: {
                                        message.typeSpecial = reader.bool();
                                        break;
                                    }
                                case 9: {
                                        message.preventshade = reader.bool();
                                        break;
                                    }
                                case 10: {
                                        message.dmask = reader.bool();
                                        break;
                                    }
                                case 11: {
                                        message.opacity = reader.float();
                                        break;
                                    }
                                case 12: {
                                        message.dmarea = reader.int32();
                                        break;
                                    }
                                case 13: {
                                        message.speedplus = reader.float();
                                        break;
                                    }
                                case 14: {
                                        message.fontsize = reader.float();
                                        break;
                                    }
                                case 15: {
                                        message.fullscreensync = reader.bool();
                                        break;
                                    }
                                case 16: {
                                        message.speedsync = reader.bool();
                                        break;
                                    }
                                case 17: {
                                        message.fontfamily = reader.string();
                                        break;
                                    }
                                case 18: {
                                        message.bold = reader.bool();
                                        break;
                                    }
                                case 19: {
                                        message.fontborder = reader.int32();
                                        break;
                                    }
                                case 21: {
                                        message.seniorModeSwitch = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        DanmuWebPlayerConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmuWebPlayerConfig";
                        };

                        return DanmuWebPlayerConfig;
                    })();

                    v1.Expressions = (function() {

                        function Expressions(properties) {
                            this.data = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        Expressions.prototype.data = $util.emptyArray;

                        Expressions.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.data != null && message.data.length)
                                for (let i = 0; i < message.data.length; ++i)
                                    $root.bilibili.community.service.dm.v1.Expression.encode(message.data[i], writer.uint32(10).fork()).ldelim();
                            return writer;
                        };

                        Expressions.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.Expressions();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.data && message.data.length))
                                            message.data = [];
                                        message.data.push($root.bilibili.community.service.dm.v1.Expression.decode(reader, reader.uint32()));
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        Expressions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Expressions";
                        };

                        return Expressions;
                    })();

                    v1.Expression = (function() {

                        function Expression(properties) {
                            this.keyword = [];
                            this.period = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        Expression.prototype.keyword = $util.emptyArray;
                        Expression.prototype.url = "";
                        Expression.prototype.period = $util.emptyArray;

                        Expression.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.keyword != null && message.keyword.length)
                                for (let i = 0; i < message.keyword.length; ++i)
                                    writer.uint32(10).string(message.keyword[i]);
                            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                                writer.uint32(18).string(message.url);
                            if (message.period != null && message.period.length)
                                for (let i = 0; i < message.period.length; ++i)
                                    $root.bilibili.community.service.dm.v1.Period.encode(message.period[i], writer.uint32(26).fork()).ldelim();
                            return writer;
                        };

                        Expression.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.Expression();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.keyword && message.keyword.length))
                                            message.keyword = [];
                                        message.keyword.push(reader.string());
                                        break;
                                    }
                                case 2: {
                                        message.url = reader.string();
                                        break;
                                    }
                                case 3: {
                                        if (!(message.period && message.period.length))
                                            message.period = [];
                                        message.period.push($root.bilibili.community.service.dm.v1.Period.decode(reader, reader.uint32()));
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        Expression.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Expression";
                        };

                        return Expression;
                    })();

                    v1.Period = (function() {

                        function Period(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        Period.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        Period.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        Period.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                                writer.uint32(8).int64(message.start);
                            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                                writer.uint32(16).int64(message.end);
                            return writer;
                        };

                        Period.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.Period();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.start = reader.int64();
                                        break;
                                    }
                                case 2: {
                                        message.end = reader.int64();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        Period.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Period";
                        };

                        return Period;
                    })();

                    v1.AnyBody = (function() {

                        function AnyBody(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        AnyBody.prototype.body = null;

                        AnyBody.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                                $root.google.protobuf.Any.encode(message.body, writer.uint32(10).fork()).ldelim();
                            return writer;
                        };

                        AnyBody.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.AnyBody();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.body = $root.google.protobuf.Any.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        AnyBody.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.AnyBody";
                        };

                        return AnyBody;
                    })();

                    v1.DmColorful = (function() {

                        function DmColorful(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        DmColorful.prototype.type = 0;
                        DmColorful.prototype.src = "";

                        DmColorful.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                writer.uint32(8).int32(message.type);
                            if (message.src != null && Object.hasOwnProperty.call(message, "src"))
                                writer.uint32(18).string(message.src);
                            return writer;
                        };

                        DmColorful.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmColorful();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.type = reader.int32();
                                        break;
                                    }
                                case 2: {
                                        message.src = reader.string();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        DmColorful.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmColorful";
                        };

                        return DmColorful;
                    })();

                    v1.DmColorfulType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "NoneType"] = 0;
                        values[valuesById[60001] = "VipGradualColor"] = 60001;
                        return values;
                    })();

                    v1.DmSubView = (function() {

                        function DmSubView(properties) {
                            this.postPanel_2 = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        DmSubView.prototype.type = 0;
                        DmSubView.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DmSubView.prototype.pid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
                        DmSubView.prototype.postPanel_2 = $util.emptyArray;

                        DmSubView.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                writer.uint32(8).int32(message.type);
                            if (message.oid != null && Object.hasOwnProperty.call(message, "oid"))
                                writer.uint32(16).int64(message.oid);
                            if (message.pid != null && Object.hasOwnProperty.call(message, "pid"))
                                writer.uint32(24).int64(message.pid);
                            if (message.postPanel_2 != null && message.postPanel_2.length)
                                for (let i = 0; i < message.postPanel_2.length; ++i)
                                    $root.bilibili.community.service.dm.v1.PostPanelV2.encode(message.postPanel_2[i], writer.uint32(34).fork()).ldelim();
                            return writer;
                        };

                        DmSubView.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmSubView();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.type = reader.int32();
                                        break;
                                    }
                                case 2: {
                                        message.oid = reader.int64();
                                        break;
                                    }
                                case 3: {
                                        message.pid = reader.int64();
                                        break;
                                    }
                                case 4: {
                                        if (!(message.postPanel_2 && message.postPanel_2.length))
                                            message.postPanel_2 = [];
                                        message.postPanel_2.push($root.bilibili.community.service.dm.v1.PostPanelV2.decode(reader, reader.uint32()));
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        DmSubView.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmSubView";
                        };

                        return DmSubView;
                    })();

                    return v1;
                })();

                return dm;
            })();

            return service;
        })();

        return community;
    })();

    return bilibili;
})();

export const google = $root.google = (() => {

    const google = {};

    google.protobuf = (function() {

        const protobuf = {};

        protobuf.Any = (function() {

            function Any(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            Any.prototype.type_url = "";
            Any.prototype.value = $util.newBuffer([]);

            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(18).bytes(message.value);
                return writer;
            };

            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.type_url = reader.string();
                            break;
                        }
                    case 2: {
                            message.value = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            Any.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Any";
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
