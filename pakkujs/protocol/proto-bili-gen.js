/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const bilibili = $root.bilibili = (() => {

    /**
     * Namespace bilibili.
     * @exports bilibili
     * @namespace
     */
    const bilibili = {};

    bilibili.community = (function() {

        /**
         * Namespace community.
         * @memberof bilibili
         * @namespace
         */
        const community = {};

        community.service = (function() {

            /**
             * Namespace service.
             * @memberof bilibili.community
             * @namespace
             */
            const service = {};

            service.dm = (function() {

                /**
                 * Namespace dm.
                 * @memberof bilibili.community.service
                 * @namespace
                 */
                const dm = {};

                dm.v1 = (function() {

                    /**
                     * Namespace v1.
                     * @memberof bilibili.community.service.dm
                     * @namespace
                     */
                    const v1 = {};

                    v1.DmWebViewReply = (function() {

                        /**
                         * Properties of a DmWebViewReply.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmWebViewReply
                         * @property {number|null} [state] DmWebViewReply state
                         * @property {string|null} [text] DmWebViewReply text
                         * @property {string|null} [textSide] DmWebViewReply textSide
                         * @property {bilibili.community.service.dm.v1.IDmSegConfig|null} [dmSge] DmWebViewReply dmSge
                         * @property {bilibili.community.service.dm.v1.IDanmakuFlagConfig|null} [flag] DmWebViewReply flag
                         * @property {Array.<string>|null} [specialDms] DmWebViewReply specialDms
                         * @property {boolean|null} [checkBox] DmWebViewReply checkBox
                         * @property {number|Long|null} [count] DmWebViewReply count
                         * @property {Array.<bilibili.community.service.dm.v1.ICommandDm>|null} [commandDms] DmWebViewReply commandDms
                         * @property {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig|null} [dmSetting] DmWebViewReply dmSetting
                         * @property {Array.<string>|null} [reportFilter] DmWebViewReply reportFilter
                         * @property {Array.<bilibili.community.service.dm.v1.IExpressions>|null} [expressions] DmWebViewReply expressions
                         * @property {Array.<bilibili.community.service.dm.v1.IPostPanel>|null} [postPanel] DmWebViewReply postPanel
                         * @property {Array.<string>|null} [activityMetas] DmWebViewReply activityMetas
                         * @property {Array.<bilibili.community.service.dm.v1.IPostPanelV2>|null} [postPanelV2] DmWebViewReply postPanelV2
                         * @property {Array.<bilibili.community.service.dm.v1.IDmSubView>|null} [subViews] DmWebViewReply subViews
                         * @property {bilibili.community.service.dm.v1.IQoeInfo|null} [qoe] DmWebViewReply qoe
                         */

                        /**
                         * Constructs a new DmWebViewReply.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmWebViewReply.
                         * @implements IDmWebViewReply
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmWebViewReply=} [properties] Properties to set
                         */
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

                        /**
                         * DmWebViewReply state.
                         * @member {number} state
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.state = 0;

                        /**
                         * DmWebViewReply text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.text = "";

                        /**
                         * DmWebViewReply textSide.
                         * @member {string} textSide
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.textSide = "";

                        /**
                         * DmWebViewReply dmSge.
                         * @member {bilibili.community.service.dm.v1.IDmSegConfig|null|undefined} dmSge
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.dmSge = null;

                        /**
                         * DmWebViewReply flag.
                         * @member {bilibili.community.service.dm.v1.IDanmakuFlagConfig|null|undefined} flag
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.flag = null;

                        /**
                         * DmWebViewReply specialDms.
                         * @member {Array.<string>} specialDms
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.specialDms = $util.emptyArray;

                        /**
                         * DmWebViewReply checkBox.
                         * @member {boolean} checkBox
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.checkBox = false;

                        /**
                         * DmWebViewReply count.
                         * @member {number|Long} count
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DmWebViewReply commandDms.
                         * @member {Array.<bilibili.community.service.dm.v1.ICommandDm>} commandDms
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.commandDms = $util.emptyArray;

                        /**
                         * DmWebViewReply dmSetting.
                         * @member {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig|null|undefined} dmSetting
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.dmSetting = null;

                        /**
                         * DmWebViewReply reportFilter.
                         * @member {Array.<string>} reportFilter
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.reportFilter = $util.emptyArray;

                        /**
                         * DmWebViewReply expressions.
                         * @member {Array.<bilibili.community.service.dm.v1.IExpressions>} expressions
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.expressions = $util.emptyArray;

                        /**
                         * DmWebViewReply postPanel.
                         * @member {Array.<bilibili.community.service.dm.v1.IPostPanel>} postPanel
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.postPanel = $util.emptyArray;

                        /**
                         * DmWebViewReply activityMetas.
                         * @member {Array.<string>} activityMetas
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.activityMetas = $util.emptyArray;

                        /**
                         * DmWebViewReply postPanelV2.
                         * @member {Array.<bilibili.community.service.dm.v1.IPostPanelV2>} postPanelV2
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.postPanelV2 = $util.emptyArray;

                        /**
                         * DmWebViewReply subViews.
                         * @member {Array.<bilibili.community.service.dm.v1.IDmSubView>} subViews
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.subViews = $util.emptyArray;

                        /**
                         * DmWebViewReply qoe.
                         * @member {bilibili.community.service.dm.v1.IQoeInfo|null|undefined} qoe
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.qoe = null;

                        /**
                         * Creates a new DmWebViewReply instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmWebViewReply=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DmWebViewReply} DmWebViewReply instance
                         */
                        DmWebViewReply.create = function create(properties) {
                            return new DmWebViewReply(properties);
                        };

                        /**
                         * Encodes the specified DmWebViewReply message. Does not implicitly {@link bilibili.community.service.dm.v1.DmWebViewReply.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmWebViewReply} message DmWebViewReply message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmWebViewReply.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.text);
                            if (message.textSide != null && Object.hasOwnProperty.call(message, "textSide"))
                                writer.uint32(/* id 3, wireType 2 =*/26).string(message.textSide);
                            if (message.dmSge != null && Object.hasOwnProperty.call(message, "dmSge"))
                                $root.bilibili.community.service.dm.v1.DmSegConfig.encode(message.dmSge, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                            if (message.flag != null && Object.hasOwnProperty.call(message, "flag"))
                                $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.encode(message.flag, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                            if (message.specialDms != null && message.specialDms.length)
                                for (let i = 0; i < message.specialDms.length; ++i)
                                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.specialDms[i]);
                            if (message.checkBox != null && Object.hasOwnProperty.call(message, "checkBox"))
                                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.checkBox);
                            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.count);
                            if (message.commandDms != null && message.commandDms.length)
                                for (let i = 0; i < message.commandDms.length; ++i)
                                    $root.bilibili.community.service.dm.v1.CommandDm.encode(message.commandDms[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                            if (message.dmSetting != null && Object.hasOwnProperty.call(message, "dmSetting"))
                                $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.encode(message.dmSetting, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                            if (message.reportFilter != null && message.reportFilter.length)
                                for (let i = 0; i < message.reportFilter.length; ++i)
                                    writer.uint32(/* id 11, wireType 2 =*/90).string(message.reportFilter[i]);
                            if (message.expressions != null && message.expressions.length)
                                for (let i = 0; i < message.expressions.length; ++i)
                                    $root.bilibili.community.service.dm.v1.Expressions.encode(message.expressions[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                            if (message.postPanel != null && message.postPanel.length)
                                for (let i = 0; i < message.postPanel.length; ++i)
                                    $root.bilibili.community.service.dm.v1.PostPanel.encode(message.postPanel[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                            if (message.activityMetas != null && message.activityMetas.length)
                                for (let i = 0; i < message.activityMetas.length; ++i)
                                    writer.uint32(/* id 14, wireType 2 =*/114).string(message.activityMetas[i]);
                            if (message.postPanelV2 != null && message.postPanelV2.length)
                                for (let i = 0; i < message.postPanelV2.length; ++i)
                                    $root.bilibili.community.service.dm.v1.PostPanelV2.encode(message.postPanelV2[i], writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                            if (message.subViews != null && message.subViews.length)
                                for (let i = 0; i < message.subViews.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DmSubView.encode(message.subViews[i], writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
                            if (message.qoe != null && Object.hasOwnProperty.call(message, "qoe"))
                                $root.bilibili.community.service.dm.v1.QoeInfo.encode(message.qoe, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified DmWebViewReply message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DmWebViewReply.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmWebViewReply} message DmWebViewReply message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmWebViewReply.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DmWebViewReply message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmWebViewReply} DmWebViewReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a DmWebViewReply message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DmWebViewReply} DmWebViewReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmWebViewReply.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DmWebViewReply message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DmWebViewReply.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.state != null && message.hasOwnProperty("state"))
                                if (!$util.isInteger(message.state))
                                    return "state: integer expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.textSide != null && message.hasOwnProperty("textSide"))
                                if (!$util.isString(message.textSide))
                                    return "textSide: string expected";
                            if (message.dmSge != null && message.hasOwnProperty("dmSge")) {
                                let error = $root.bilibili.community.service.dm.v1.DmSegConfig.verify(message.dmSge);
                                if (error)
                                    return "dmSge." + error;
                            }
                            if (message.flag != null && message.hasOwnProperty("flag")) {
                                let error = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.verify(message.flag);
                                if (error)
                                    return "flag." + error;
                            }
                            if (message.specialDms != null && message.hasOwnProperty("specialDms")) {
                                if (!Array.isArray(message.specialDms))
                                    return "specialDms: array expected";
                                for (let i = 0; i < message.specialDms.length; ++i)
                                    if (!$util.isString(message.specialDms[i]))
                                        return "specialDms: string[] expected";
                            }
                            if (message.checkBox != null && message.hasOwnProperty("checkBox"))
                                if (typeof message.checkBox !== "boolean")
                                    return "checkBox: boolean expected";
                            if (message.count != null && message.hasOwnProperty("count"))
                                if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                                    return "count: integer|Long expected";
                            if (message.commandDms != null && message.hasOwnProperty("commandDms")) {
                                if (!Array.isArray(message.commandDms))
                                    return "commandDms: array expected";
                                for (let i = 0; i < message.commandDms.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.CommandDm.verify(message.commandDms[i]);
                                    if (error)
                                        return "commandDms." + error;
                                }
                            }
                            if (message.dmSetting != null && message.hasOwnProperty("dmSetting")) {
                                let error = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.verify(message.dmSetting);
                                if (error)
                                    return "dmSetting." + error;
                            }
                            if (message.reportFilter != null && message.hasOwnProperty("reportFilter")) {
                                if (!Array.isArray(message.reportFilter))
                                    return "reportFilter: array expected";
                                for (let i = 0; i < message.reportFilter.length; ++i)
                                    if (!$util.isString(message.reportFilter[i]))
                                        return "reportFilter: string[] expected";
                            }
                            if (message.expressions != null && message.hasOwnProperty("expressions")) {
                                if (!Array.isArray(message.expressions))
                                    return "expressions: array expected";
                                for (let i = 0; i < message.expressions.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.Expressions.verify(message.expressions[i]);
                                    if (error)
                                        return "expressions." + error;
                                }
                            }
                            if (message.postPanel != null && message.hasOwnProperty("postPanel")) {
                                if (!Array.isArray(message.postPanel))
                                    return "postPanel: array expected";
                                for (let i = 0; i < message.postPanel.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.PostPanel.verify(message.postPanel[i]);
                                    if (error)
                                        return "postPanel." + error;
                                }
                            }
                            if (message.activityMetas != null && message.hasOwnProperty("activityMetas")) {
                                if (!Array.isArray(message.activityMetas))
                                    return "activityMetas: array expected";
                                for (let i = 0; i < message.activityMetas.length; ++i)
                                    if (!$util.isString(message.activityMetas[i]))
                                        return "activityMetas: string[] expected";
                            }
                            if (message.postPanelV2 != null && message.hasOwnProperty("postPanelV2")) {
                                if (!Array.isArray(message.postPanelV2))
                                    return "postPanelV2: array expected";
                                for (let i = 0; i < message.postPanelV2.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.PostPanelV2.verify(message.postPanelV2[i]);
                                    if (error)
                                        return "postPanelV2." + error;
                                }
                            }
                            if (message.subViews != null && message.hasOwnProperty("subViews")) {
                                if (!Array.isArray(message.subViews))
                                    return "subViews: array expected";
                                for (let i = 0; i < message.subViews.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.DmSubView.verify(message.subViews[i]);
                                    if (error)
                                        return "subViews." + error;
                                }
                            }
                            if (message.qoe != null && message.hasOwnProperty("qoe")) {
                                let error = $root.bilibili.community.service.dm.v1.QoeInfo.verify(message.qoe);
                                if (error)
                                    return "qoe." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates a DmWebViewReply message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DmWebViewReply} DmWebViewReply
                         */
                        DmWebViewReply.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DmWebViewReply)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DmWebViewReply();
                            if (object.state != null)
                                message.state = object.state | 0;
                            if (object.text != null)
                                message.text = String(object.text);
                            if (object.textSide != null)
                                message.textSide = String(object.textSide);
                            if (object.dmSge != null) {
                                if (typeof object.dmSge !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.dmSge: object expected");
                                message.dmSge = $root.bilibili.community.service.dm.v1.DmSegConfig.fromObject(object.dmSge);
                            }
                            if (object.flag != null) {
                                if (typeof object.flag !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.flag: object expected");
                                message.flag = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.fromObject(object.flag);
                            }
                            if (object.specialDms) {
                                if (!Array.isArray(object.specialDms))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.specialDms: array expected");
                                message.specialDms = [];
                                for (let i = 0; i < object.specialDms.length; ++i)
                                    message.specialDms[i] = String(object.specialDms[i]);
                            }
                            if (object.checkBox != null)
                                message.checkBox = Boolean(object.checkBox);
                            if (object.count != null)
                                if ($util.Long)
                                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                                else if (typeof object.count === "string")
                                    message.count = parseInt(object.count, 10);
                                else if (typeof object.count === "number")
                                    message.count = object.count;
                                else if (typeof object.count === "object")
                                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                            if (object.commandDms) {
                                if (!Array.isArray(object.commandDms))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.commandDms: array expected");
                                message.commandDms = [];
                                for (let i = 0; i < object.commandDms.length; ++i) {
                                    if (typeof object.commandDms[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.commandDms: object expected");
                                    message.commandDms[i] = $root.bilibili.community.service.dm.v1.CommandDm.fromObject(object.commandDms[i]);
                                }
                            }
                            if (object.dmSetting != null) {
                                if (typeof object.dmSetting !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.dmSetting: object expected");
                                message.dmSetting = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.fromObject(object.dmSetting);
                            }
                            if (object.reportFilter) {
                                if (!Array.isArray(object.reportFilter))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.reportFilter: array expected");
                                message.reportFilter = [];
                                for (let i = 0; i < object.reportFilter.length; ++i)
                                    message.reportFilter[i] = String(object.reportFilter[i]);
                            }
                            if (object.expressions) {
                                if (!Array.isArray(object.expressions))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.expressions: array expected");
                                message.expressions = [];
                                for (let i = 0; i < object.expressions.length; ++i) {
                                    if (typeof object.expressions[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.expressions: object expected");
                                    message.expressions[i] = $root.bilibili.community.service.dm.v1.Expressions.fromObject(object.expressions[i]);
                                }
                            }
                            if (object.postPanel) {
                                if (!Array.isArray(object.postPanel))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.postPanel: array expected");
                                message.postPanel = [];
                                for (let i = 0; i < object.postPanel.length; ++i) {
                                    if (typeof object.postPanel[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.postPanel: object expected");
                                    message.postPanel[i] = $root.bilibili.community.service.dm.v1.PostPanel.fromObject(object.postPanel[i]);
                                }
                            }
                            if (object.activityMetas) {
                                if (!Array.isArray(object.activityMetas))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.activityMetas: array expected");
                                message.activityMetas = [];
                                for (let i = 0; i < object.activityMetas.length; ++i)
                                    message.activityMetas[i] = String(object.activityMetas[i]);
                            }
                            if (object.postPanelV2) {
                                if (!Array.isArray(object.postPanelV2))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.postPanelV2: array expected");
                                message.postPanelV2 = [];
                                for (let i = 0; i < object.postPanelV2.length; ++i) {
                                    if (typeof object.postPanelV2[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.postPanelV2: object expected");
                                    message.postPanelV2[i] = $root.bilibili.community.service.dm.v1.PostPanelV2.fromObject(object.postPanelV2[i]);
                                }
                            }
                            if (object.subViews) {
                                if (!Array.isArray(object.subViews))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.subViews: array expected");
                                message.subViews = [];
                                for (let i = 0; i < object.subViews.length; ++i) {
                                    if (typeof object.subViews[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.subViews: object expected");
                                    message.subViews[i] = $root.bilibili.community.service.dm.v1.DmSubView.fromObject(object.subViews[i]);
                                }
                            }
                            if (object.qoe != null) {
                                if (typeof object.qoe !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.qoe: object expected");
                                message.qoe = $root.bilibili.community.service.dm.v1.QoeInfo.fromObject(object.qoe);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a DmWebViewReply message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.DmWebViewReply} message DmWebViewReply
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DmWebViewReply.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults) {
                                object.specialDms = [];
                                object.commandDms = [];
                                object.reportFilter = [];
                                object.expressions = [];
                                object.postPanel = [];
                                object.activityMetas = [];
                                object.postPanelV2 = [];
                                object.subViews = [];
                            }
                            if (options.defaults) {
                                object.state = 0;
                                object.text = "";
                                object.textSide = "";
                                object.dmSge = null;
                                object.flag = null;
                                object.checkBox = false;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.count = options.longs === String ? "0" : 0;
                                object.dmSetting = null;
                                object.qoe = null;
                            }
                            if (message.state != null && message.hasOwnProperty("state"))
                                object.state = message.state;
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.textSide != null && message.hasOwnProperty("textSide"))
                                object.textSide = message.textSide;
                            if (message.dmSge != null && message.hasOwnProperty("dmSge"))
                                object.dmSge = $root.bilibili.community.service.dm.v1.DmSegConfig.toObject(message.dmSge, options);
                            if (message.flag != null && message.hasOwnProperty("flag"))
                                object.flag = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.toObject(message.flag, options);
                            if (message.specialDms && message.specialDms.length) {
                                object.specialDms = [];
                                for (let j = 0; j < message.specialDms.length; ++j)
                                    object.specialDms[j] = message.specialDms[j];
                            }
                            if (message.checkBox != null && message.hasOwnProperty("checkBox"))
                                object.checkBox = message.checkBox;
                            if (message.count != null && message.hasOwnProperty("count"))
                                if (typeof message.count === "number")
                                    object.count = options.longs === String ? String(message.count) : message.count;
                                else
                                    object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                            if (message.commandDms && message.commandDms.length) {
                                object.commandDms = [];
                                for (let j = 0; j < message.commandDms.length; ++j)
                                    object.commandDms[j] = $root.bilibili.community.service.dm.v1.CommandDm.toObject(message.commandDms[j], options);
                            }
                            if (message.dmSetting != null && message.hasOwnProperty("dmSetting"))
                                object.dmSetting = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.toObject(message.dmSetting, options);
                            if (message.reportFilter && message.reportFilter.length) {
                                object.reportFilter = [];
                                for (let j = 0; j < message.reportFilter.length; ++j)
                                    object.reportFilter[j] = message.reportFilter[j];
                            }
                            if (message.expressions && message.expressions.length) {
                                object.expressions = [];
                                for (let j = 0; j < message.expressions.length; ++j)
                                    object.expressions[j] = $root.bilibili.community.service.dm.v1.Expressions.toObject(message.expressions[j], options);
                            }
                            if (message.postPanel && message.postPanel.length) {
                                object.postPanel = [];
                                for (let j = 0; j < message.postPanel.length; ++j)
                                    object.postPanel[j] = $root.bilibili.community.service.dm.v1.PostPanel.toObject(message.postPanel[j], options);
                            }
                            if (message.activityMetas && message.activityMetas.length) {
                                object.activityMetas = [];
                                for (let j = 0; j < message.activityMetas.length; ++j)
                                    object.activityMetas[j] = message.activityMetas[j];
                            }
                            if (message.postPanelV2 && message.postPanelV2.length) {
                                object.postPanelV2 = [];
                                for (let j = 0; j < message.postPanelV2.length; ++j)
                                    object.postPanelV2[j] = $root.bilibili.community.service.dm.v1.PostPanelV2.toObject(message.postPanelV2[j], options);
                            }
                            if (message.subViews && message.subViews.length) {
                                object.subViews = [];
                                for (let j = 0; j < message.subViews.length; ++j)
                                    object.subViews[j] = $root.bilibili.community.service.dm.v1.DmSubView.toObject(message.subViews[j], options);
                            }
                            if (message.qoe != null && message.hasOwnProperty("qoe"))
                                object.qoe = $root.bilibili.community.service.dm.v1.QoeInfo.toObject(message.qoe, options);
                            return object;
                        };

                        /**
                         * Converts this DmWebViewReply to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DmWebViewReply.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DmWebViewReply
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DmWebViewReply.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmWebViewReply";
                        };

                        return DmWebViewReply;
                    })();

                    v1.QoeInfo = (function() {

                        /**
                         * Properties of a QoeInfo.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IQoeInfo
                         * @property {string|null} [info] QoeInfo info
                         */

                        /**
                         * Constructs a new QoeInfo.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a QoeInfo.
                         * @implements IQoeInfo
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IQoeInfo=} [properties] Properties to set
                         */
                        function QoeInfo(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * QoeInfo info.
                         * @member {string} info
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @instance
                         */
                        QoeInfo.prototype.info = "";

                        /**
                         * Creates a new QoeInfo instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @static
                         * @param {bilibili.community.service.dm.v1.IQoeInfo=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.QoeInfo} QoeInfo instance
                         */
                        QoeInfo.create = function create(properties) {
                            return new QoeInfo(properties);
                        };

                        /**
                         * Encodes the specified QoeInfo message. Does not implicitly {@link bilibili.community.service.dm.v1.QoeInfo.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @static
                         * @param {bilibili.community.service.dm.v1.IQoeInfo} message QoeInfo message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        QoeInfo.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.info);
                            return writer;
                        };

                        /**
                         * Encodes the specified QoeInfo message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.QoeInfo.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @static
                         * @param {bilibili.community.service.dm.v1.IQoeInfo} message QoeInfo message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        QoeInfo.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a QoeInfo message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.QoeInfo} QoeInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a QoeInfo message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.QoeInfo} QoeInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        QoeInfo.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a QoeInfo message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        QoeInfo.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.info != null && message.hasOwnProperty("info"))
                                if (!$util.isString(message.info))
                                    return "info: string expected";
                            return null;
                        };

                        /**
                         * Creates a QoeInfo message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.QoeInfo} QoeInfo
                         */
                        QoeInfo.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.QoeInfo)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.QoeInfo();
                            if (object.info != null)
                                message.info = String(object.info);
                            return message;
                        };

                        /**
                         * Creates a plain object from a QoeInfo message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @static
                         * @param {bilibili.community.service.dm.v1.QoeInfo} message QoeInfo
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        QoeInfo.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults)
                                object.info = "";
                            if (message.info != null && message.hasOwnProperty("info"))
                                object.info = message.info;
                            return object;
                        };

                        /**
                         * Converts this QoeInfo to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        QoeInfo.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for QoeInfo
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.QoeInfo
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        QoeInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.QoeInfo";
                        };

                        return QoeInfo;
                    })();

                    v1.PostPanel = (function() {

                        /**
                         * Properties of a PostPanel.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IPostPanel
                         * @property {number|Long|null} [start] PostPanel start
                         * @property {number|Long|null} [end] PostPanel end
                         * @property {number|Long|null} [priority] PostPanel priority
                         * @property {number|Long|null} [bizId] PostPanel bizId
                         * @property {bilibili.community.service.dm.v1.PostPanelBizType|null} [bizType] PostPanel bizType
                         * @property {bilibili.community.service.dm.v1.IClickButton|null} [clickButton] PostPanel clickButton
                         * @property {bilibili.community.service.dm.v1.ITextInput|null} [textInput] PostPanel textInput
                         * @property {bilibili.community.service.dm.v1.ICheckBox|null} [checkBox] PostPanel checkBox
                         * @property {bilibili.community.service.dm.v1.IToast|null} [toast] PostPanel toast
                         */

                        /**
                         * Constructs a new PostPanel.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a PostPanel.
                         * @implements IPostPanel
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IPostPanel=} [properties] Properties to set
                         */
                        function PostPanel(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * PostPanel start.
                         * @member {number|Long} start
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanel end.
                         * @member {number|Long} end
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanel priority.
                         * @member {number|Long} priority
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.priority = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanel bizId.
                         * @member {number|Long} bizId
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.bizId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanel bizType.
                         * @member {bilibili.community.service.dm.v1.PostPanelBizType} bizType
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.bizType = 0;

                        /**
                         * PostPanel clickButton.
                         * @member {bilibili.community.service.dm.v1.IClickButton|null|undefined} clickButton
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.clickButton = null;

                        /**
                         * PostPanel textInput.
                         * @member {bilibili.community.service.dm.v1.ITextInput|null|undefined} textInput
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.textInput = null;

                        /**
                         * PostPanel checkBox.
                         * @member {bilibili.community.service.dm.v1.ICheckBox|null|undefined} checkBox
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.checkBox = null;

                        /**
                         * PostPanel toast.
                         * @member {bilibili.community.service.dm.v1.IToast|null|undefined} toast
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.toast = null;

                        /**
                         * Creates a new PostPanel instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @static
                         * @param {bilibili.community.service.dm.v1.IPostPanel=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.PostPanel} PostPanel instance
                         */
                        PostPanel.create = function create(properties) {
                            return new PostPanel(properties);
                        };

                        /**
                         * Encodes the specified PostPanel message. Does not implicitly {@link bilibili.community.service.dm.v1.PostPanel.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @static
                         * @param {bilibili.community.service.dm.v1.IPostPanel} message PostPanel message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PostPanel.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.start);
                            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.end);
                            if (message.priority != null && Object.hasOwnProperty.call(message, "priority"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.priority);
                            if (message.bizId != null && Object.hasOwnProperty.call(message, "bizId"))
                                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.bizId);
                            if (message.bizType != null && Object.hasOwnProperty.call(message, "bizType"))
                                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.bizType);
                            if (message.clickButton != null && Object.hasOwnProperty.call(message, "clickButton"))
                                $root.bilibili.community.service.dm.v1.ClickButton.encode(message.clickButton, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                            if (message.textInput != null && Object.hasOwnProperty.call(message, "textInput"))
                                $root.bilibili.community.service.dm.v1.TextInput.encode(message.textInput, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                            if (message.checkBox != null && Object.hasOwnProperty.call(message, "checkBox"))
                                $root.bilibili.community.service.dm.v1.CheckBox.encode(message.checkBox, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                            if (message.toast != null && Object.hasOwnProperty.call(message, "toast"))
                                $root.bilibili.community.service.dm.v1.Toast.encode(message.toast, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified PostPanel message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.PostPanel.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @static
                         * @param {bilibili.community.service.dm.v1.IPostPanel} message PostPanel message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PostPanel.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a PostPanel message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.PostPanel} PostPanel
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a PostPanel message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.PostPanel} PostPanel
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        PostPanel.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a PostPanel message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        PostPanel.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.start != null && message.hasOwnProperty("start"))
                                if (!$util.isInteger(message.start) && !(message.start && $util.isInteger(message.start.low) && $util.isInteger(message.start.high)))
                                    return "start: integer|Long expected";
                            if (message.end != null && message.hasOwnProperty("end"))
                                if (!$util.isInteger(message.end) && !(message.end && $util.isInteger(message.end.low) && $util.isInteger(message.end.high)))
                                    return "end: integer|Long expected";
                            if (message.priority != null && message.hasOwnProperty("priority"))
                                if (!$util.isInteger(message.priority) && !(message.priority && $util.isInteger(message.priority.low) && $util.isInteger(message.priority.high)))
                                    return "priority: integer|Long expected";
                            if (message.bizId != null && message.hasOwnProperty("bizId"))
                                if (!$util.isInteger(message.bizId) && !(message.bizId && $util.isInteger(message.bizId.low) && $util.isInteger(message.bizId.high)))
                                    return "bizId: integer|Long expected";
                            if (message.bizType != null && message.hasOwnProperty("bizType"))
                                switch (message.bizType) {
                                default:
                                    return "bizType: enum value expected";
                                case 0:
                                case 1:
                                case 4:
                                case 2:
                                    break;
                                }
                            if (message.clickButton != null && message.hasOwnProperty("clickButton")) {
                                let error = $root.bilibili.community.service.dm.v1.ClickButton.verify(message.clickButton);
                                if (error)
                                    return "clickButton." + error;
                            }
                            if (message.textInput != null && message.hasOwnProperty("textInput")) {
                                let error = $root.bilibili.community.service.dm.v1.TextInput.verify(message.textInput);
                                if (error)
                                    return "textInput." + error;
                            }
                            if (message.checkBox != null && message.hasOwnProperty("checkBox")) {
                                let error = $root.bilibili.community.service.dm.v1.CheckBox.verify(message.checkBox);
                                if (error)
                                    return "checkBox." + error;
                            }
                            if (message.toast != null && message.hasOwnProperty("toast")) {
                                let error = $root.bilibili.community.service.dm.v1.Toast.verify(message.toast);
                                if (error)
                                    return "toast." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates a PostPanel message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.PostPanel} PostPanel
                         */
                        PostPanel.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.PostPanel)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.PostPanel();
                            if (object.start != null)
                                if ($util.Long)
                                    (message.start = $util.Long.fromValue(object.start)).unsigned = false;
                                else if (typeof object.start === "string")
                                    message.start = parseInt(object.start, 10);
                                else if (typeof object.start === "number")
                                    message.start = object.start;
                                else if (typeof object.start === "object")
                                    message.start = new $util.LongBits(object.start.low >>> 0, object.start.high >>> 0).toNumber();
                            if (object.end != null)
                                if ($util.Long)
                                    (message.end = $util.Long.fromValue(object.end)).unsigned = false;
                                else if (typeof object.end === "string")
                                    message.end = parseInt(object.end, 10);
                                else if (typeof object.end === "number")
                                    message.end = object.end;
                                else if (typeof object.end === "object")
                                    message.end = new $util.LongBits(object.end.low >>> 0, object.end.high >>> 0).toNumber();
                            if (object.priority != null)
                                if ($util.Long)
                                    (message.priority = $util.Long.fromValue(object.priority)).unsigned = false;
                                else if (typeof object.priority === "string")
                                    message.priority = parseInt(object.priority, 10);
                                else if (typeof object.priority === "number")
                                    message.priority = object.priority;
                                else if (typeof object.priority === "object")
                                    message.priority = new $util.LongBits(object.priority.low >>> 0, object.priority.high >>> 0).toNumber();
                            if (object.bizId != null)
                                if ($util.Long)
                                    (message.bizId = $util.Long.fromValue(object.bizId)).unsigned = false;
                                else if (typeof object.bizId === "string")
                                    message.bizId = parseInt(object.bizId, 10);
                                else if (typeof object.bizId === "number")
                                    message.bizId = object.bizId;
                                else if (typeof object.bizId === "object")
                                    message.bizId = new $util.LongBits(object.bizId.low >>> 0, object.bizId.high >>> 0).toNumber();
                            switch (object.bizType) {
                            default:
                                if (typeof object.bizType === "number") {
                                    message.bizType = object.bizType;
                                    break;
                                }
                                break;
                            case "PostPanelBizTypeNone":
                            case 0:
                                message.bizType = 0;
                                break;
                            case "PostPanelBizTypeEncourage":
                            case 1:
                                message.bizType = 1;
                                break;
                            case "PostPanelBizTypeFragClose":
                            case 4:
                                message.bizType = 4;
                                break;
                            case "PostPanelBizTypeColorDM":
                            case 2:
                                message.bizType = 2;
                                break;
                            }
                            if (object.clickButton != null) {
                                if (typeof object.clickButton !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanel.clickButton: object expected");
                                message.clickButton = $root.bilibili.community.service.dm.v1.ClickButton.fromObject(object.clickButton);
                            }
                            if (object.textInput != null) {
                                if (typeof object.textInput !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanel.textInput: object expected");
                                message.textInput = $root.bilibili.community.service.dm.v1.TextInput.fromObject(object.textInput);
                            }
                            if (object.checkBox != null) {
                                if (typeof object.checkBox !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanel.checkBox: object expected");
                                message.checkBox = $root.bilibili.community.service.dm.v1.CheckBox.fromObject(object.checkBox);
                            }
                            if (object.toast != null) {
                                if (typeof object.toast !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanel.toast: object expected");
                                message.toast = $root.bilibili.community.service.dm.v1.Toast.fromObject(object.toast);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a PostPanel message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @static
                         * @param {bilibili.community.service.dm.v1.PostPanel} message PostPanel
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        PostPanel.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.start = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.start = options.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.end = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.end = options.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.priority = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.priority = options.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.bizId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.bizId = options.longs === String ? "0" : 0;
                                object.bizType = options.enums === String ? "PostPanelBizTypeNone" : 0;
                                object.clickButton = null;
                                object.textInput = null;
                                object.checkBox = null;
                                object.toast = null;
                            }
                            if (message.start != null && message.hasOwnProperty("start"))
                                if (typeof message.start === "number")
                                    object.start = options.longs === String ? String(message.start) : message.start;
                                else
                                    object.start = options.longs === String ? $util.Long.prototype.toString.call(message.start) : options.longs === Number ? new $util.LongBits(message.start.low >>> 0, message.start.high >>> 0).toNumber() : message.start;
                            if (message.end != null && message.hasOwnProperty("end"))
                                if (typeof message.end === "number")
                                    object.end = options.longs === String ? String(message.end) : message.end;
                                else
                                    object.end = options.longs === String ? $util.Long.prototype.toString.call(message.end) : options.longs === Number ? new $util.LongBits(message.end.low >>> 0, message.end.high >>> 0).toNumber() : message.end;
                            if (message.priority != null && message.hasOwnProperty("priority"))
                                if (typeof message.priority === "number")
                                    object.priority = options.longs === String ? String(message.priority) : message.priority;
                                else
                                    object.priority = options.longs === String ? $util.Long.prototype.toString.call(message.priority) : options.longs === Number ? new $util.LongBits(message.priority.low >>> 0, message.priority.high >>> 0).toNumber() : message.priority;
                            if (message.bizId != null && message.hasOwnProperty("bizId"))
                                if (typeof message.bizId === "number")
                                    object.bizId = options.longs === String ? String(message.bizId) : message.bizId;
                                else
                                    object.bizId = options.longs === String ? $util.Long.prototype.toString.call(message.bizId) : options.longs === Number ? new $util.LongBits(message.bizId.low >>> 0, message.bizId.high >>> 0).toNumber() : message.bizId;
                            if (message.bizType != null && message.hasOwnProperty("bizType"))
                                object.bizType = options.enums === String ? $root.bilibili.community.service.dm.v1.PostPanelBizType[message.bizType] === undefined ? message.bizType : $root.bilibili.community.service.dm.v1.PostPanelBizType[message.bizType] : message.bizType;
                            if (message.clickButton != null && message.hasOwnProperty("clickButton"))
                                object.clickButton = $root.bilibili.community.service.dm.v1.ClickButton.toObject(message.clickButton, options);
                            if (message.textInput != null && message.hasOwnProperty("textInput"))
                                object.textInput = $root.bilibili.community.service.dm.v1.TextInput.toObject(message.textInput, options);
                            if (message.checkBox != null && message.hasOwnProperty("checkBox"))
                                object.checkBox = $root.bilibili.community.service.dm.v1.CheckBox.toObject(message.checkBox, options);
                            if (message.toast != null && message.hasOwnProperty("toast"))
                                object.toast = $root.bilibili.community.service.dm.v1.Toast.toObject(message.toast, options);
                            return object;
                        };

                        /**
                         * Converts this PostPanel to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        PostPanel.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for PostPanel
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        PostPanel.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.PostPanel";
                        };

                        return PostPanel;
                    })();

                    v1.PostPanelV2 = (function() {

                        /**
                         * Properties of a PostPanelV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IPostPanelV2
                         * @property {number|Long|null} [start] PostPanelV2 start
                         * @property {number|Long|null} [end] PostPanelV2 end
                         * @property {bilibili.community.service.dm.v1.PostPanelBizType|null} [bizType] PostPanelV2 bizType
                         * @property {bilibili.community.service.dm.v1.IClickButtonV2|null} [clickButton] PostPanelV2 clickButton
                         * @property {bilibili.community.service.dm.v1.ITextInputV2|null} [textInput] PostPanelV2 textInput
                         * @property {bilibili.community.service.dm.v1.ICheckBoxV2|null} [checkBox] PostPanelV2 checkBox
                         * @property {bilibili.community.service.dm.v1.IToastV2|null} [toast] PostPanelV2 toast
                         * @property {bilibili.community.service.dm.v1.IBubbleV2|null} [bubble] PostPanelV2 bubble
                         * @property {bilibili.community.service.dm.v1.ILabelV2|null} [label] PostPanelV2 label
                         * @property {bilibili.community.service.dm.v1.PostStatus|null} [postStatus] PostPanelV2 postStatus
                         */

                        /**
                         * Constructs a new PostPanelV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a PostPanelV2.
                         * @implements IPostPanelV2
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IPostPanelV2=} [properties] Properties to set
                         */
                        function PostPanelV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * PostPanelV2 start.
                         * @member {number|Long} start
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanelV2 end.
                         * @member {number|Long} end
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanelV2 bizType.
                         * @member {bilibili.community.service.dm.v1.PostPanelBizType} bizType
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.bizType = 0;

                        /**
                         * PostPanelV2 clickButton.
                         * @member {bilibili.community.service.dm.v1.IClickButtonV2|null|undefined} clickButton
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.clickButton = null;

                        /**
                         * PostPanelV2 textInput.
                         * @member {bilibili.community.service.dm.v1.ITextInputV2|null|undefined} textInput
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.textInput = null;

                        /**
                         * PostPanelV2 checkBox.
                         * @member {bilibili.community.service.dm.v1.ICheckBoxV2|null|undefined} checkBox
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.checkBox = null;

                        /**
                         * PostPanelV2 toast.
                         * @member {bilibili.community.service.dm.v1.IToastV2|null|undefined} toast
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.toast = null;

                        /**
                         * PostPanelV2 bubble.
                         * @member {bilibili.community.service.dm.v1.IBubbleV2|null|undefined} bubble
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.bubble = null;

                        /**
                         * PostPanelV2 label.
                         * @member {bilibili.community.service.dm.v1.ILabelV2|null|undefined} label
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.label = null;

                        /**
                         * PostPanelV2 postStatus.
                         * @member {bilibili.community.service.dm.v1.PostStatus} postStatus
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.postStatus = 0;

                        /**
                         * Creates a new PostPanelV2 instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IPostPanelV2=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.PostPanelV2} PostPanelV2 instance
                         */
                        PostPanelV2.create = function create(properties) {
                            return new PostPanelV2(properties);
                        };

                        /**
                         * Encodes the specified PostPanelV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.PostPanelV2.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IPostPanelV2} message PostPanelV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PostPanelV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.start);
                            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.end);
                            if (message.bizType != null && Object.hasOwnProperty.call(message, "bizType"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.bizType);
                            if (message.clickButton != null && Object.hasOwnProperty.call(message, "clickButton"))
                                $root.bilibili.community.service.dm.v1.ClickButtonV2.encode(message.clickButton, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                            if (message.textInput != null && Object.hasOwnProperty.call(message, "textInput"))
                                $root.bilibili.community.service.dm.v1.TextInputV2.encode(message.textInput, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                            if (message.checkBox != null && Object.hasOwnProperty.call(message, "checkBox"))
                                $root.bilibili.community.service.dm.v1.CheckBoxV2.encode(message.checkBox, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                            if (message.toast != null && Object.hasOwnProperty.call(message, "toast"))
                                $root.bilibili.community.service.dm.v1.ToastV2.encode(message.toast, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                            if (message.bubble != null && Object.hasOwnProperty.call(message, "bubble"))
                                $root.bilibili.community.service.dm.v1.BubbleV2.encode(message.bubble, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                            if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                                $root.bilibili.community.service.dm.v1.LabelV2.encode(message.label, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                            if (message.postStatus != null && Object.hasOwnProperty.call(message, "postStatus"))
                                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.postStatus);
                            return writer;
                        };

                        /**
                         * Encodes the specified PostPanelV2 message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.PostPanelV2.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IPostPanelV2} message PostPanelV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PostPanelV2.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a PostPanelV2 message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.PostPanelV2} PostPanelV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a PostPanelV2 message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.PostPanelV2} PostPanelV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        PostPanelV2.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a PostPanelV2 message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        PostPanelV2.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.start != null && message.hasOwnProperty("start"))
                                if (!$util.isInteger(message.start) && !(message.start && $util.isInteger(message.start.low) && $util.isInteger(message.start.high)))
                                    return "start: integer|Long expected";
                            if (message.end != null && message.hasOwnProperty("end"))
                                if (!$util.isInteger(message.end) && !(message.end && $util.isInteger(message.end.low) && $util.isInteger(message.end.high)))
                                    return "end: integer|Long expected";
                            if (message.bizType != null && message.hasOwnProperty("bizType"))
                                switch (message.bizType) {
                                default:
                                    return "bizType: enum value expected";
                                case 0:
                                case 1:
                                case 4:
                                case 2:
                                    break;
                                }
                            if (message.clickButton != null && message.hasOwnProperty("clickButton")) {
                                let error = $root.bilibili.community.service.dm.v1.ClickButtonV2.verify(message.clickButton);
                                if (error)
                                    return "clickButton." + error;
                            }
                            if (message.textInput != null && message.hasOwnProperty("textInput")) {
                                let error = $root.bilibili.community.service.dm.v1.TextInputV2.verify(message.textInput);
                                if (error)
                                    return "textInput." + error;
                            }
                            if (message.checkBox != null && message.hasOwnProperty("checkBox")) {
                                let error = $root.bilibili.community.service.dm.v1.CheckBoxV2.verify(message.checkBox);
                                if (error)
                                    return "checkBox." + error;
                            }
                            if (message.toast != null && message.hasOwnProperty("toast")) {
                                let error = $root.bilibili.community.service.dm.v1.ToastV2.verify(message.toast);
                                if (error)
                                    return "toast." + error;
                            }
                            if (message.bubble != null && message.hasOwnProperty("bubble")) {
                                let error = $root.bilibili.community.service.dm.v1.BubbleV2.verify(message.bubble);
                                if (error)
                                    return "bubble." + error;
                            }
                            if (message.label != null && message.hasOwnProperty("label")) {
                                let error = $root.bilibili.community.service.dm.v1.LabelV2.verify(message.label);
                                if (error)
                                    return "label." + error;
                            }
                            if (message.postStatus != null && message.hasOwnProperty("postStatus"))
                                switch (message.postStatus) {
                                default:
                                    return "postStatus: enum value expected";
                                case 0:
                                case 1:
                                    break;
                                }
                            return null;
                        };

                        /**
                         * Creates a PostPanelV2 message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.PostPanelV2} PostPanelV2
                         */
                        PostPanelV2.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.PostPanelV2)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.PostPanelV2();
                            if (object.start != null)
                                if ($util.Long)
                                    (message.start = $util.Long.fromValue(object.start)).unsigned = false;
                                else if (typeof object.start === "string")
                                    message.start = parseInt(object.start, 10);
                                else if (typeof object.start === "number")
                                    message.start = object.start;
                                else if (typeof object.start === "object")
                                    message.start = new $util.LongBits(object.start.low >>> 0, object.start.high >>> 0).toNumber();
                            if (object.end != null)
                                if ($util.Long)
                                    (message.end = $util.Long.fromValue(object.end)).unsigned = false;
                                else if (typeof object.end === "string")
                                    message.end = parseInt(object.end, 10);
                                else if (typeof object.end === "number")
                                    message.end = object.end;
                                else if (typeof object.end === "object")
                                    message.end = new $util.LongBits(object.end.low >>> 0, object.end.high >>> 0).toNumber();
                            switch (object.bizType) {
                            default:
                                if (typeof object.bizType === "number") {
                                    message.bizType = object.bizType;
                                    break;
                                }
                                break;
                            case "PostPanelBizTypeNone":
                            case 0:
                                message.bizType = 0;
                                break;
                            case "PostPanelBizTypeEncourage":
                            case 1:
                                message.bizType = 1;
                                break;
                            case "PostPanelBizTypeFragClose":
                            case 4:
                                message.bizType = 4;
                                break;
                            case "PostPanelBizTypeColorDM":
                            case 2:
                                message.bizType = 2;
                                break;
                            }
                            if (object.clickButton != null) {
                                if (typeof object.clickButton !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanelV2.clickButton: object expected");
                                message.clickButton = $root.bilibili.community.service.dm.v1.ClickButtonV2.fromObject(object.clickButton);
                            }
                            if (object.textInput != null) {
                                if (typeof object.textInput !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanelV2.textInput: object expected");
                                message.textInput = $root.bilibili.community.service.dm.v1.TextInputV2.fromObject(object.textInput);
                            }
                            if (object.checkBox != null) {
                                if (typeof object.checkBox !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanelV2.checkBox: object expected");
                                message.checkBox = $root.bilibili.community.service.dm.v1.CheckBoxV2.fromObject(object.checkBox);
                            }
                            if (object.toast != null) {
                                if (typeof object.toast !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanelV2.toast: object expected");
                                message.toast = $root.bilibili.community.service.dm.v1.ToastV2.fromObject(object.toast);
                            }
                            if (object.bubble != null) {
                                if (typeof object.bubble !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanelV2.bubble: object expected");
                                message.bubble = $root.bilibili.community.service.dm.v1.BubbleV2.fromObject(object.bubble);
                            }
                            if (object.label != null) {
                                if (typeof object.label !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.PostPanelV2.label: object expected");
                                message.label = $root.bilibili.community.service.dm.v1.LabelV2.fromObject(object.label);
                            }
                            switch (object.postStatus) {
                            default:
                                if (typeof object.postStatus === "number") {
                                    message.postStatus = object.postStatus;
                                    break;
                                }
                                break;
                            case "PostStatusNormal":
                            case 0:
                                message.postStatus = 0;
                                break;
                            case "PostStatusClosed":
                            case 1:
                                message.postStatus = 1;
                                break;
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a PostPanelV2 message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.PostPanelV2} message PostPanelV2
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        PostPanelV2.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.start = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.start = options.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.end = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.end = options.longs === String ? "0" : 0;
                                object.bizType = options.enums === String ? "PostPanelBizTypeNone" : 0;
                                object.clickButton = null;
                                object.textInput = null;
                                object.checkBox = null;
                                object.toast = null;
                                object.bubble = null;
                                object.label = null;
                                object.postStatus = options.enums === String ? "PostStatusNormal" : 0;
                            }
                            if (message.start != null && message.hasOwnProperty("start"))
                                if (typeof message.start === "number")
                                    object.start = options.longs === String ? String(message.start) : message.start;
                                else
                                    object.start = options.longs === String ? $util.Long.prototype.toString.call(message.start) : options.longs === Number ? new $util.LongBits(message.start.low >>> 0, message.start.high >>> 0).toNumber() : message.start;
                            if (message.end != null && message.hasOwnProperty("end"))
                                if (typeof message.end === "number")
                                    object.end = options.longs === String ? String(message.end) : message.end;
                                else
                                    object.end = options.longs === String ? $util.Long.prototype.toString.call(message.end) : options.longs === Number ? new $util.LongBits(message.end.low >>> 0, message.end.high >>> 0).toNumber() : message.end;
                            if (message.bizType != null && message.hasOwnProperty("bizType"))
                                object.bizType = options.enums === String ? $root.bilibili.community.service.dm.v1.PostPanelBizType[message.bizType] === undefined ? message.bizType : $root.bilibili.community.service.dm.v1.PostPanelBizType[message.bizType] : message.bizType;
                            if (message.clickButton != null && message.hasOwnProperty("clickButton"))
                                object.clickButton = $root.bilibili.community.service.dm.v1.ClickButtonV2.toObject(message.clickButton, options);
                            if (message.textInput != null && message.hasOwnProperty("textInput"))
                                object.textInput = $root.bilibili.community.service.dm.v1.TextInputV2.toObject(message.textInput, options);
                            if (message.checkBox != null && message.hasOwnProperty("checkBox"))
                                object.checkBox = $root.bilibili.community.service.dm.v1.CheckBoxV2.toObject(message.checkBox, options);
                            if (message.toast != null && message.hasOwnProperty("toast"))
                                object.toast = $root.bilibili.community.service.dm.v1.ToastV2.toObject(message.toast, options);
                            if (message.bubble != null && message.hasOwnProperty("bubble"))
                                object.bubble = $root.bilibili.community.service.dm.v1.BubbleV2.toObject(message.bubble, options);
                            if (message.label != null && message.hasOwnProperty("label"))
                                object.label = $root.bilibili.community.service.dm.v1.LabelV2.toObject(message.label, options);
                            if (message.postStatus != null && message.hasOwnProperty("postStatus"))
                                object.postStatus = options.enums === String ? $root.bilibili.community.service.dm.v1.PostStatus[message.postStatus] === undefined ? message.postStatus : $root.bilibili.community.service.dm.v1.PostStatus[message.postStatus] : message.postStatus;
                            return object;
                        };

                        /**
                         * Converts this PostPanelV2 to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        PostPanelV2.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for PostPanelV2
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        PostPanelV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.PostPanelV2";
                        };

                        return PostPanelV2;
                    })();

                    v1.ClickButton = (function() {

                        /**
                         * Properties of a ClickButton.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IClickButton
                         * @property {Array.<string>|null} [portraitText] ClickButton portraitText
                         * @property {Array.<string>|null} [landscapeText] ClickButton landscapeText
                         * @property {Array.<string>|null} [portraitTextFocus] ClickButton portraitTextFocus
                         * @property {Array.<string>|null} [landscapeTextFocus] ClickButton landscapeTextFocus
                         * @property {bilibili.community.service.dm.v1.RenderType|null} [renderType] ClickButton renderType
                         * @property {boolean|null} [show] ClickButton show
                         */

                        /**
                         * Constructs a new ClickButton.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a ClickButton.
                         * @implements IClickButton
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IClickButton=} [properties] Properties to set
                         */
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

                        /**
                         * ClickButton portraitText.
                         * @member {Array.<string>} portraitText
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @instance
                         */
                        ClickButton.prototype.portraitText = $util.emptyArray;

                        /**
                         * ClickButton landscapeText.
                         * @member {Array.<string>} landscapeText
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @instance
                         */
                        ClickButton.prototype.landscapeText = $util.emptyArray;

                        /**
                         * ClickButton portraitTextFocus.
                         * @member {Array.<string>} portraitTextFocus
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @instance
                         */
                        ClickButton.prototype.portraitTextFocus = $util.emptyArray;

                        /**
                         * ClickButton landscapeTextFocus.
                         * @member {Array.<string>} landscapeTextFocus
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @instance
                         */
                        ClickButton.prototype.landscapeTextFocus = $util.emptyArray;

                        /**
                         * ClickButton renderType.
                         * @member {bilibili.community.service.dm.v1.RenderType} renderType
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @instance
                         */
                        ClickButton.prototype.renderType = 0;

                        /**
                         * ClickButton show.
                         * @member {boolean} show
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @instance
                         */
                        ClickButton.prototype.show = false;

                        /**
                         * Creates a new ClickButton instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @static
                         * @param {bilibili.community.service.dm.v1.IClickButton=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.ClickButton} ClickButton instance
                         */
                        ClickButton.create = function create(properties) {
                            return new ClickButton(properties);
                        };

                        /**
                         * Encodes the specified ClickButton message. Does not implicitly {@link bilibili.community.service.dm.v1.ClickButton.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @static
                         * @param {bilibili.community.service.dm.v1.IClickButton} message ClickButton message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ClickButton.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.portraitText != null && message.portraitText.length)
                                for (let i = 0; i < message.portraitText.length; ++i)
                                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.portraitText[i]);
                            if (message.landscapeText != null && message.landscapeText.length)
                                for (let i = 0; i < message.landscapeText.length; ++i)
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.landscapeText[i]);
                            if (message.portraitTextFocus != null && message.portraitTextFocus.length)
                                for (let i = 0; i < message.portraitTextFocus.length; ++i)
                                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.portraitTextFocus[i]);
                            if (message.landscapeTextFocus != null && message.landscapeTextFocus.length)
                                for (let i = 0; i < message.landscapeTextFocus.length; ++i)
                                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.landscapeTextFocus[i]);
                            if (message.renderType != null && Object.hasOwnProperty.call(message, "renderType"))
                                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.renderType);
                            if (message.show != null && Object.hasOwnProperty.call(message, "show"))
                                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.show);
                            return writer;
                        };

                        /**
                         * Encodes the specified ClickButton message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.ClickButton.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @static
                         * @param {bilibili.community.service.dm.v1.IClickButton} message ClickButton message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ClickButton.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a ClickButton message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.ClickButton} ClickButton
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a ClickButton message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.ClickButton} ClickButton
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ClickButton.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a ClickButton message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ClickButton.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.portraitText != null && message.hasOwnProperty("portraitText")) {
                                if (!Array.isArray(message.portraitText))
                                    return "portraitText: array expected";
                                for (let i = 0; i < message.portraitText.length; ++i)
                                    if (!$util.isString(message.portraitText[i]))
                                        return "portraitText: string[] expected";
                            }
                            if (message.landscapeText != null && message.hasOwnProperty("landscapeText")) {
                                if (!Array.isArray(message.landscapeText))
                                    return "landscapeText: array expected";
                                for (let i = 0; i < message.landscapeText.length; ++i)
                                    if (!$util.isString(message.landscapeText[i]))
                                        return "landscapeText: string[] expected";
                            }
                            if (message.portraitTextFocus != null && message.hasOwnProperty("portraitTextFocus")) {
                                if (!Array.isArray(message.portraitTextFocus))
                                    return "portraitTextFocus: array expected";
                                for (let i = 0; i < message.portraitTextFocus.length; ++i)
                                    if (!$util.isString(message.portraitTextFocus[i]))
                                        return "portraitTextFocus: string[] expected";
                            }
                            if (message.landscapeTextFocus != null && message.hasOwnProperty("landscapeTextFocus")) {
                                if (!Array.isArray(message.landscapeTextFocus))
                                    return "landscapeTextFocus: array expected";
                                for (let i = 0; i < message.landscapeTextFocus.length; ++i)
                                    if (!$util.isString(message.landscapeTextFocus[i]))
                                        return "landscapeTextFocus: string[] expected";
                            }
                            if (message.renderType != null && message.hasOwnProperty("renderType"))
                                switch (message.renderType) {
                                default:
                                    return "renderType: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break;
                                }
                            if (message.show != null && message.hasOwnProperty("show"))
                                if (typeof message.show !== "boolean")
                                    return "show: boolean expected";
                            return null;
                        };

                        /**
                         * Creates a ClickButton message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.ClickButton} ClickButton
                         */
                        ClickButton.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.ClickButton)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.ClickButton();
                            if (object.portraitText) {
                                if (!Array.isArray(object.portraitText))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButton.portraitText: array expected");
                                message.portraitText = [];
                                for (let i = 0; i < object.portraitText.length; ++i)
                                    message.portraitText[i] = String(object.portraitText[i]);
                            }
                            if (object.landscapeText) {
                                if (!Array.isArray(object.landscapeText))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButton.landscapeText: array expected");
                                message.landscapeText = [];
                                for (let i = 0; i < object.landscapeText.length; ++i)
                                    message.landscapeText[i] = String(object.landscapeText[i]);
                            }
                            if (object.portraitTextFocus) {
                                if (!Array.isArray(object.portraitTextFocus))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButton.portraitTextFocus: array expected");
                                message.portraitTextFocus = [];
                                for (let i = 0; i < object.portraitTextFocus.length; ++i)
                                    message.portraitTextFocus[i] = String(object.portraitTextFocus[i]);
                            }
                            if (object.landscapeTextFocus) {
                                if (!Array.isArray(object.landscapeTextFocus))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButton.landscapeTextFocus: array expected");
                                message.landscapeTextFocus = [];
                                for (let i = 0; i < object.landscapeTextFocus.length; ++i)
                                    message.landscapeTextFocus[i] = String(object.landscapeTextFocus[i]);
                            }
                            switch (object.renderType) {
                            default:
                                if (typeof object.renderType === "number") {
                                    message.renderType = object.renderType;
                                    break;
                                }
                                break;
                            case "RenderTypeNone":
                            case 0:
                                message.renderType = 0;
                                break;
                            case "RenderTypeSingle":
                            case 1:
                                message.renderType = 1;
                                break;
                            case "RenderTypeRotation":
                            case 2:
                                message.renderType = 2;
                                break;
                            }
                            if (object.show != null)
                                message.show = Boolean(object.show);
                            return message;
                        };

                        /**
                         * Creates a plain object from a ClickButton message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @static
                         * @param {bilibili.community.service.dm.v1.ClickButton} message ClickButton
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ClickButton.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults) {
                                object.portraitText = [];
                                object.landscapeText = [];
                                object.portraitTextFocus = [];
                                object.landscapeTextFocus = [];
                            }
                            if (options.defaults) {
                                object.renderType = options.enums === String ? "RenderTypeNone" : 0;
                                object.show = false;
                            }
                            if (message.portraitText && message.portraitText.length) {
                                object.portraitText = [];
                                for (let j = 0; j < message.portraitText.length; ++j)
                                    object.portraitText[j] = message.portraitText[j];
                            }
                            if (message.landscapeText && message.landscapeText.length) {
                                object.landscapeText = [];
                                for (let j = 0; j < message.landscapeText.length; ++j)
                                    object.landscapeText[j] = message.landscapeText[j];
                            }
                            if (message.portraitTextFocus && message.portraitTextFocus.length) {
                                object.portraitTextFocus = [];
                                for (let j = 0; j < message.portraitTextFocus.length; ++j)
                                    object.portraitTextFocus[j] = message.portraitTextFocus[j];
                            }
                            if (message.landscapeTextFocus && message.landscapeTextFocus.length) {
                                object.landscapeTextFocus = [];
                                for (let j = 0; j < message.landscapeTextFocus.length; ++j)
                                    object.landscapeTextFocus[j] = message.landscapeTextFocus[j];
                            }
                            if (message.renderType != null && message.hasOwnProperty("renderType"))
                                object.renderType = options.enums === String ? $root.bilibili.community.service.dm.v1.RenderType[message.renderType] === undefined ? message.renderType : $root.bilibili.community.service.dm.v1.RenderType[message.renderType] : message.renderType;
                            if (message.show != null && message.hasOwnProperty("show"))
                                object.show = message.show;
                            return object;
                        };

                        /**
                         * Converts this ClickButton to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ClickButton.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for ClickButton
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.ClickButton
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        ClickButton.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.ClickButton";
                        };

                        return ClickButton;
                    })();

                    v1.ClickButtonV2 = (function() {

                        /**
                         * Properties of a ClickButtonV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IClickButtonV2
                         * @property {Array.<string>|null} [portraitText] ClickButtonV2 portraitText
                         * @property {Array.<string>|null} [landscapeText] ClickButtonV2 landscapeText
                         * @property {Array.<string>|null} [portraitTextFocus] ClickButtonV2 portraitTextFocus
                         * @property {Array.<string>|null} [landscapeTextFocus] ClickButtonV2 landscapeTextFocus
                         * @property {bilibili.community.service.dm.v1.RenderType|null} [renderType] ClickButtonV2 renderType
                         * @property {boolean|null} [textInputPost] ClickButtonV2 textInputPost
                         * @property {boolean|null} [exposureOnce] ClickButtonV2 exposureOnce
                         * @property {bilibili.community.service.dm.v1.ExposureType|null} [exposureType] ClickButtonV2 exposureType
                         */

                        /**
                         * Constructs a new ClickButtonV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a ClickButtonV2.
                         * @implements IClickButtonV2
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IClickButtonV2=} [properties] Properties to set
                         */
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

                        /**
                         * ClickButtonV2 portraitText.
                         * @member {Array.<string>} portraitText
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @instance
                         */
                        ClickButtonV2.prototype.portraitText = $util.emptyArray;

                        /**
                         * ClickButtonV2 landscapeText.
                         * @member {Array.<string>} landscapeText
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @instance
                         */
                        ClickButtonV2.prototype.landscapeText = $util.emptyArray;

                        /**
                         * ClickButtonV2 portraitTextFocus.
                         * @member {Array.<string>} portraitTextFocus
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @instance
                         */
                        ClickButtonV2.prototype.portraitTextFocus = $util.emptyArray;

                        /**
                         * ClickButtonV2 landscapeTextFocus.
                         * @member {Array.<string>} landscapeTextFocus
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @instance
                         */
                        ClickButtonV2.prototype.landscapeTextFocus = $util.emptyArray;

                        /**
                         * ClickButtonV2 renderType.
                         * @member {bilibili.community.service.dm.v1.RenderType} renderType
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @instance
                         */
                        ClickButtonV2.prototype.renderType = 0;

                        /**
                         * ClickButtonV2 textInputPost.
                         * @member {boolean} textInputPost
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @instance
                         */
                        ClickButtonV2.prototype.textInputPost = false;

                        /**
                         * ClickButtonV2 exposureOnce.
                         * @member {boolean} exposureOnce
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @instance
                         */
                        ClickButtonV2.prototype.exposureOnce = false;

                        /**
                         * ClickButtonV2 exposureType.
                         * @member {bilibili.community.service.dm.v1.ExposureType} exposureType
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @instance
                         */
                        ClickButtonV2.prototype.exposureType = 0;

                        /**
                         * Creates a new ClickButtonV2 instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IClickButtonV2=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.ClickButtonV2} ClickButtonV2 instance
                         */
                        ClickButtonV2.create = function create(properties) {
                            return new ClickButtonV2(properties);
                        };

                        /**
                         * Encodes the specified ClickButtonV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.ClickButtonV2.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IClickButtonV2} message ClickButtonV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ClickButtonV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.portraitText != null && message.portraitText.length)
                                for (let i = 0; i < message.portraitText.length; ++i)
                                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.portraitText[i]);
                            if (message.landscapeText != null && message.landscapeText.length)
                                for (let i = 0; i < message.landscapeText.length; ++i)
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.landscapeText[i]);
                            if (message.portraitTextFocus != null && message.portraitTextFocus.length)
                                for (let i = 0; i < message.portraitTextFocus.length; ++i)
                                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.portraitTextFocus[i]);
                            if (message.landscapeTextFocus != null && message.landscapeTextFocus.length)
                                for (let i = 0; i < message.landscapeTextFocus.length; ++i)
                                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.landscapeTextFocus[i]);
                            if (message.renderType != null && Object.hasOwnProperty.call(message, "renderType"))
                                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.renderType);
                            if (message.textInputPost != null && Object.hasOwnProperty.call(message, "textInputPost"))
                                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.textInputPost);
                            if (message.exposureOnce != null && Object.hasOwnProperty.call(message, "exposureOnce"))
                                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.exposureOnce);
                            if (message.exposureType != null && Object.hasOwnProperty.call(message, "exposureType"))
                                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.exposureType);
                            return writer;
                        };

                        /**
                         * Encodes the specified ClickButtonV2 message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.ClickButtonV2.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IClickButtonV2} message ClickButtonV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ClickButtonV2.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a ClickButtonV2 message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.ClickButtonV2} ClickButtonV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a ClickButtonV2 message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.ClickButtonV2} ClickButtonV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ClickButtonV2.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a ClickButtonV2 message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ClickButtonV2.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.portraitText != null && message.hasOwnProperty("portraitText")) {
                                if (!Array.isArray(message.portraitText))
                                    return "portraitText: array expected";
                                for (let i = 0; i < message.portraitText.length; ++i)
                                    if (!$util.isString(message.portraitText[i]))
                                        return "portraitText: string[] expected";
                            }
                            if (message.landscapeText != null && message.hasOwnProperty("landscapeText")) {
                                if (!Array.isArray(message.landscapeText))
                                    return "landscapeText: array expected";
                                for (let i = 0; i < message.landscapeText.length; ++i)
                                    if (!$util.isString(message.landscapeText[i]))
                                        return "landscapeText: string[] expected";
                            }
                            if (message.portraitTextFocus != null && message.hasOwnProperty("portraitTextFocus")) {
                                if (!Array.isArray(message.portraitTextFocus))
                                    return "portraitTextFocus: array expected";
                                for (let i = 0; i < message.portraitTextFocus.length; ++i)
                                    if (!$util.isString(message.portraitTextFocus[i]))
                                        return "portraitTextFocus: string[] expected";
                            }
                            if (message.landscapeTextFocus != null && message.hasOwnProperty("landscapeTextFocus")) {
                                if (!Array.isArray(message.landscapeTextFocus))
                                    return "landscapeTextFocus: array expected";
                                for (let i = 0; i < message.landscapeTextFocus.length; ++i)
                                    if (!$util.isString(message.landscapeTextFocus[i]))
                                        return "landscapeTextFocus: string[] expected";
                            }
                            if (message.renderType != null && message.hasOwnProperty("renderType"))
                                switch (message.renderType) {
                                default:
                                    return "renderType: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break;
                                }
                            if (message.textInputPost != null && message.hasOwnProperty("textInputPost"))
                                if (typeof message.textInputPost !== "boolean")
                                    return "textInputPost: boolean expected";
                            if (message.exposureOnce != null && message.hasOwnProperty("exposureOnce"))
                                if (typeof message.exposureOnce !== "boolean")
                                    return "exposureOnce: boolean expected";
                            if (message.exposureType != null && message.hasOwnProperty("exposureType"))
                                switch (message.exposureType) {
                                default:
                                    return "exposureType: enum value expected";
                                case 0:
                                case 1:
                                    break;
                                }
                            return null;
                        };

                        /**
                         * Creates a ClickButtonV2 message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.ClickButtonV2} ClickButtonV2
                         */
                        ClickButtonV2.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.ClickButtonV2)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.ClickButtonV2();
                            if (object.portraitText) {
                                if (!Array.isArray(object.portraitText))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButtonV2.portraitText: array expected");
                                message.portraitText = [];
                                for (let i = 0; i < object.portraitText.length; ++i)
                                    message.portraitText[i] = String(object.portraitText[i]);
                            }
                            if (object.landscapeText) {
                                if (!Array.isArray(object.landscapeText))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButtonV2.landscapeText: array expected");
                                message.landscapeText = [];
                                for (let i = 0; i < object.landscapeText.length; ++i)
                                    message.landscapeText[i] = String(object.landscapeText[i]);
                            }
                            if (object.portraitTextFocus) {
                                if (!Array.isArray(object.portraitTextFocus))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButtonV2.portraitTextFocus: array expected");
                                message.portraitTextFocus = [];
                                for (let i = 0; i < object.portraitTextFocus.length; ++i)
                                    message.portraitTextFocus[i] = String(object.portraitTextFocus[i]);
                            }
                            if (object.landscapeTextFocus) {
                                if (!Array.isArray(object.landscapeTextFocus))
                                    throw TypeError(".bilibili.community.service.dm.v1.ClickButtonV2.landscapeTextFocus: array expected");
                                message.landscapeTextFocus = [];
                                for (let i = 0; i < object.landscapeTextFocus.length; ++i)
                                    message.landscapeTextFocus[i] = String(object.landscapeTextFocus[i]);
                            }
                            switch (object.renderType) {
                            default:
                                if (typeof object.renderType === "number") {
                                    message.renderType = object.renderType;
                                    break;
                                }
                                break;
                            case "RenderTypeNone":
                            case 0:
                                message.renderType = 0;
                                break;
                            case "RenderTypeSingle":
                            case 1:
                                message.renderType = 1;
                                break;
                            case "RenderTypeRotation":
                            case 2:
                                message.renderType = 2;
                                break;
                            }
                            if (object.textInputPost != null)
                                message.textInputPost = Boolean(object.textInputPost);
                            if (object.exposureOnce != null)
                                message.exposureOnce = Boolean(object.exposureOnce);
                            switch (object.exposureType) {
                            default:
                                if (typeof object.exposureType === "number") {
                                    message.exposureType = object.exposureType;
                                    break;
                                }
                                break;
                            case "ExposureTypeNone":
                            case 0:
                                message.exposureType = 0;
                                break;
                            case "ExposureTypeDMSend":
                            case 1:
                                message.exposureType = 1;
                                break;
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a ClickButtonV2 message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ClickButtonV2} message ClickButtonV2
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ClickButtonV2.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults) {
                                object.portraitText = [];
                                object.landscapeText = [];
                                object.portraitTextFocus = [];
                                object.landscapeTextFocus = [];
                            }
                            if (options.defaults) {
                                object.renderType = options.enums === String ? "RenderTypeNone" : 0;
                                object.textInputPost = false;
                                object.exposureOnce = false;
                                object.exposureType = options.enums === String ? "ExposureTypeNone" : 0;
                            }
                            if (message.portraitText && message.portraitText.length) {
                                object.portraitText = [];
                                for (let j = 0; j < message.portraitText.length; ++j)
                                    object.portraitText[j] = message.portraitText[j];
                            }
                            if (message.landscapeText && message.landscapeText.length) {
                                object.landscapeText = [];
                                for (let j = 0; j < message.landscapeText.length; ++j)
                                    object.landscapeText[j] = message.landscapeText[j];
                            }
                            if (message.portraitTextFocus && message.portraitTextFocus.length) {
                                object.portraitTextFocus = [];
                                for (let j = 0; j < message.portraitTextFocus.length; ++j)
                                    object.portraitTextFocus[j] = message.portraitTextFocus[j];
                            }
                            if (message.landscapeTextFocus && message.landscapeTextFocus.length) {
                                object.landscapeTextFocus = [];
                                for (let j = 0; j < message.landscapeTextFocus.length; ++j)
                                    object.landscapeTextFocus[j] = message.landscapeTextFocus[j];
                            }
                            if (message.renderType != null && message.hasOwnProperty("renderType"))
                                object.renderType = options.enums === String ? $root.bilibili.community.service.dm.v1.RenderType[message.renderType] === undefined ? message.renderType : $root.bilibili.community.service.dm.v1.RenderType[message.renderType] : message.renderType;
                            if (message.textInputPost != null && message.hasOwnProperty("textInputPost"))
                                object.textInputPost = message.textInputPost;
                            if (message.exposureOnce != null && message.hasOwnProperty("exposureOnce"))
                                object.exposureOnce = message.exposureOnce;
                            if (message.exposureType != null && message.hasOwnProperty("exposureType"))
                                object.exposureType = options.enums === String ? $root.bilibili.community.service.dm.v1.ExposureType[message.exposureType] === undefined ? message.exposureType : $root.bilibili.community.service.dm.v1.ExposureType[message.exposureType] : message.exposureType;
                            return object;
                        };

                        /**
                         * Converts this ClickButtonV2 to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ClickButtonV2.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for ClickButtonV2
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.ClickButtonV2
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        ClickButtonV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.ClickButtonV2";
                        };

                        return ClickButtonV2;
                    })();

                    /**
                     * PostPanelBizType enum.
                     * @name bilibili.community.service.dm.v1.PostPanelBizType
                     * @enum {number}
                     * @property {number} PostPanelBizTypeNone=0 PostPanelBizTypeNone value
                     * @property {number} PostPanelBizTypeEncourage=1 PostPanelBizTypeEncourage value
                     * @property {number} PostPanelBizTypeFragClose=4 PostPanelBizTypeFragClose value
                     * @property {number} PostPanelBizTypeColorDM=2 PostPanelBizTypeColorDM value
                     */
                    v1.PostPanelBizType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "PostPanelBizTypeNone"] = 0;
                        values[valuesById[1] = "PostPanelBizTypeEncourage"] = 1;
                        values[valuesById[4] = "PostPanelBizTypeFragClose"] = 4;
                        values[valuesById[2] = "PostPanelBizTypeColorDM"] = 2;
                        return values;
                    })();

                    v1.TextInput = (function() {

                        /**
                         * Properties of a TextInput.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface ITextInput
                         * @property {Array.<string>|null} [portraitPlaceholder] TextInput portraitPlaceholder
                         * @property {Array.<string>|null} [landscapePlaceholder] TextInput landscapePlaceholder
                         * @property {bilibili.community.service.dm.v1.RenderType|null} [renderType] TextInput renderType
                         * @property {boolean|null} [placeholderPost] TextInput placeholderPost
                         * @property {boolean|null} [show] TextInput show
                         * @property {bilibili.community.service.dm.v1.PostStatus|null} [postStatus] TextInput postStatus
                         */

                        /**
                         * Constructs a new TextInput.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a TextInput.
                         * @implements ITextInput
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.ITextInput=} [properties] Properties to set
                         */
                        function TextInput(properties) {
                            this.portraitPlaceholder = [];
                            this.landscapePlaceholder = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * TextInput portraitPlaceholder.
                         * @member {Array.<string>} portraitPlaceholder
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @instance
                         */
                        TextInput.prototype.portraitPlaceholder = $util.emptyArray;

                        /**
                         * TextInput landscapePlaceholder.
                         * @member {Array.<string>} landscapePlaceholder
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @instance
                         */
                        TextInput.prototype.landscapePlaceholder = $util.emptyArray;

                        /**
                         * TextInput renderType.
                         * @member {bilibili.community.service.dm.v1.RenderType} renderType
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @instance
                         */
                        TextInput.prototype.renderType = 0;

                        /**
                         * TextInput placeholderPost.
                         * @member {boolean} placeholderPost
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @instance
                         */
                        TextInput.prototype.placeholderPost = false;

                        /**
                         * TextInput show.
                         * @member {boolean} show
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @instance
                         */
                        TextInput.prototype.show = false;

                        /**
                         * TextInput postStatus.
                         * @member {bilibili.community.service.dm.v1.PostStatus} postStatus
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @instance
                         */
                        TextInput.prototype.postStatus = 0;

                        /**
                         * Creates a new TextInput instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @static
                         * @param {bilibili.community.service.dm.v1.ITextInput=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.TextInput} TextInput instance
                         */
                        TextInput.create = function create(properties) {
                            return new TextInput(properties);
                        };

                        /**
                         * Encodes the specified TextInput message. Does not implicitly {@link bilibili.community.service.dm.v1.TextInput.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @static
                         * @param {bilibili.community.service.dm.v1.ITextInput} message TextInput message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        TextInput.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.portraitPlaceholder != null && message.portraitPlaceholder.length)
                                for (let i = 0; i < message.portraitPlaceholder.length; ++i)
                                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.portraitPlaceholder[i]);
                            if (message.landscapePlaceholder != null && message.landscapePlaceholder.length)
                                for (let i = 0; i < message.landscapePlaceholder.length; ++i)
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.landscapePlaceholder[i]);
                            if (message.renderType != null && Object.hasOwnProperty.call(message, "renderType"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.renderType);
                            if (message.placeholderPost != null && Object.hasOwnProperty.call(message, "placeholderPost"))
                                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.placeholderPost);
                            if (message.show != null && Object.hasOwnProperty.call(message, "show"))
                                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.show);
                            if (message.postStatus != null && Object.hasOwnProperty.call(message, "postStatus"))
                                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.postStatus);
                            return writer;
                        };

                        /**
                         * Encodes the specified TextInput message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.TextInput.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @static
                         * @param {bilibili.community.service.dm.v1.ITextInput} message TextInput message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        TextInput.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a TextInput message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.TextInput} TextInput
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a TextInput message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.TextInput} TextInput
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        TextInput.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a TextInput message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        TextInput.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.portraitPlaceholder != null && message.hasOwnProperty("portraitPlaceholder")) {
                                if (!Array.isArray(message.portraitPlaceholder))
                                    return "portraitPlaceholder: array expected";
                                for (let i = 0; i < message.portraitPlaceholder.length; ++i)
                                    if (!$util.isString(message.portraitPlaceholder[i]))
                                        return "portraitPlaceholder: string[] expected";
                            }
                            if (message.landscapePlaceholder != null && message.hasOwnProperty("landscapePlaceholder")) {
                                if (!Array.isArray(message.landscapePlaceholder))
                                    return "landscapePlaceholder: array expected";
                                for (let i = 0; i < message.landscapePlaceholder.length; ++i)
                                    if (!$util.isString(message.landscapePlaceholder[i]))
                                        return "landscapePlaceholder: string[] expected";
                            }
                            if (message.renderType != null && message.hasOwnProperty("renderType"))
                                switch (message.renderType) {
                                default:
                                    return "renderType: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break;
                                }
                            if (message.placeholderPost != null && message.hasOwnProperty("placeholderPost"))
                                if (typeof message.placeholderPost !== "boolean")
                                    return "placeholderPost: boolean expected";
                            if (message.show != null && message.hasOwnProperty("show"))
                                if (typeof message.show !== "boolean")
                                    return "show: boolean expected";
                            if (message.postStatus != null && message.hasOwnProperty("postStatus"))
                                switch (message.postStatus) {
                                default:
                                    return "postStatus: enum value expected";
                                case 0:
                                case 1:
                                    break;
                                }
                            return null;
                        };

                        /**
                         * Creates a TextInput message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.TextInput} TextInput
                         */
                        TextInput.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.TextInput)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.TextInput();
                            if (object.portraitPlaceholder) {
                                if (!Array.isArray(object.portraitPlaceholder))
                                    throw TypeError(".bilibili.community.service.dm.v1.TextInput.portraitPlaceholder: array expected");
                                message.portraitPlaceholder = [];
                                for (let i = 0; i < object.portraitPlaceholder.length; ++i)
                                    message.portraitPlaceholder[i] = String(object.portraitPlaceholder[i]);
                            }
                            if (object.landscapePlaceholder) {
                                if (!Array.isArray(object.landscapePlaceholder))
                                    throw TypeError(".bilibili.community.service.dm.v1.TextInput.landscapePlaceholder: array expected");
                                message.landscapePlaceholder = [];
                                for (let i = 0; i < object.landscapePlaceholder.length; ++i)
                                    message.landscapePlaceholder[i] = String(object.landscapePlaceholder[i]);
                            }
                            switch (object.renderType) {
                            default:
                                if (typeof object.renderType === "number") {
                                    message.renderType = object.renderType;
                                    break;
                                }
                                break;
                            case "RenderTypeNone":
                            case 0:
                                message.renderType = 0;
                                break;
                            case "RenderTypeSingle":
                            case 1:
                                message.renderType = 1;
                                break;
                            case "RenderTypeRotation":
                            case 2:
                                message.renderType = 2;
                                break;
                            }
                            if (object.placeholderPost != null)
                                message.placeholderPost = Boolean(object.placeholderPost);
                            if (object.show != null)
                                message.show = Boolean(object.show);
                            switch (object.postStatus) {
                            default:
                                if (typeof object.postStatus === "number") {
                                    message.postStatus = object.postStatus;
                                    break;
                                }
                                break;
                            case "PostStatusNormal":
                            case 0:
                                message.postStatus = 0;
                                break;
                            case "PostStatusClosed":
                            case 1:
                                message.postStatus = 1;
                                break;
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a TextInput message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @static
                         * @param {bilibili.community.service.dm.v1.TextInput} message TextInput
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        TextInput.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults) {
                                object.portraitPlaceholder = [];
                                object.landscapePlaceholder = [];
                            }
                            if (options.defaults) {
                                object.renderType = options.enums === String ? "RenderTypeNone" : 0;
                                object.placeholderPost = false;
                                object.show = false;
                                object.postStatus = options.enums === String ? "PostStatusNormal" : 0;
                            }
                            if (message.portraitPlaceholder && message.portraitPlaceholder.length) {
                                object.portraitPlaceholder = [];
                                for (let j = 0; j < message.portraitPlaceholder.length; ++j)
                                    object.portraitPlaceholder[j] = message.portraitPlaceholder[j];
                            }
                            if (message.landscapePlaceholder && message.landscapePlaceholder.length) {
                                object.landscapePlaceholder = [];
                                for (let j = 0; j < message.landscapePlaceholder.length; ++j)
                                    object.landscapePlaceholder[j] = message.landscapePlaceholder[j];
                            }
                            if (message.renderType != null && message.hasOwnProperty("renderType"))
                                object.renderType = options.enums === String ? $root.bilibili.community.service.dm.v1.RenderType[message.renderType] === undefined ? message.renderType : $root.bilibili.community.service.dm.v1.RenderType[message.renderType] : message.renderType;
                            if (message.placeholderPost != null && message.hasOwnProperty("placeholderPost"))
                                object.placeholderPost = message.placeholderPost;
                            if (message.show != null && message.hasOwnProperty("show"))
                                object.show = message.show;
                            if (message.postStatus != null && message.hasOwnProperty("postStatus"))
                                object.postStatus = options.enums === String ? $root.bilibili.community.service.dm.v1.PostStatus[message.postStatus] === undefined ? message.postStatus : $root.bilibili.community.service.dm.v1.PostStatus[message.postStatus] : message.postStatus;
                            return object;
                        };

                        /**
                         * Converts this TextInput to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        TextInput.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for TextInput
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.TextInput
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        TextInput.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.TextInput";
                        };

                        return TextInput;
                    })();

                    v1.TextInputV2 = (function() {

                        /**
                         * Properties of a TextInputV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface ITextInputV2
                         * @property {Array.<string>|null} [portraitPlaceholder] TextInputV2 portraitPlaceholder
                         * @property {Array.<string>|null} [landscapePlaceholder] TextInputV2 landscapePlaceholder
                         * @property {bilibili.community.service.dm.v1.RenderType|null} [renderType] TextInputV2 renderType
                         * @property {boolean|null} [placeholderPost] TextInputV2 placeholderPost
                         * @property {number|null} [textInputLimit] TextInputV2 textInputLimit
                         */

                        /**
                         * Constructs a new TextInputV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a TextInputV2.
                         * @implements ITextInputV2
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.ITextInputV2=} [properties] Properties to set
                         */
                        function TextInputV2(properties) {
                            this.portraitPlaceholder = [];
                            this.landscapePlaceholder = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * TextInputV2 portraitPlaceholder.
                         * @member {Array.<string>} portraitPlaceholder
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @instance
                         */
                        TextInputV2.prototype.portraitPlaceholder = $util.emptyArray;

                        /**
                         * TextInputV2 landscapePlaceholder.
                         * @member {Array.<string>} landscapePlaceholder
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @instance
                         */
                        TextInputV2.prototype.landscapePlaceholder = $util.emptyArray;

                        /**
                         * TextInputV2 renderType.
                         * @member {bilibili.community.service.dm.v1.RenderType} renderType
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @instance
                         */
                        TextInputV2.prototype.renderType = 0;

                        /**
                         * TextInputV2 placeholderPost.
                         * @member {boolean} placeholderPost
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @instance
                         */
                        TextInputV2.prototype.placeholderPost = false;

                        /**
                         * TextInputV2 textInputLimit.
                         * @member {number} textInputLimit
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @instance
                         */
                        TextInputV2.prototype.textInputLimit = 0;

                        /**
                         * Creates a new TextInputV2 instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ITextInputV2=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.TextInputV2} TextInputV2 instance
                         */
                        TextInputV2.create = function create(properties) {
                            return new TextInputV2(properties);
                        };

                        /**
                         * Encodes the specified TextInputV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.TextInputV2.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ITextInputV2} message TextInputV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        TextInputV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.portraitPlaceholder != null && message.portraitPlaceholder.length)
                                for (let i = 0; i < message.portraitPlaceholder.length; ++i)
                                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.portraitPlaceholder[i]);
                            if (message.landscapePlaceholder != null && message.landscapePlaceholder.length)
                                for (let i = 0; i < message.landscapePlaceholder.length; ++i)
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.landscapePlaceholder[i]);
                            if (message.renderType != null && Object.hasOwnProperty.call(message, "renderType"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.renderType);
                            if (message.placeholderPost != null && Object.hasOwnProperty.call(message, "placeholderPost"))
                                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.placeholderPost);
                            if (message.textInputLimit != null && Object.hasOwnProperty.call(message, "textInputLimit"))
                                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.textInputLimit);
                            return writer;
                        };

                        /**
                         * Encodes the specified TextInputV2 message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.TextInputV2.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ITextInputV2} message TextInputV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        TextInputV2.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a TextInputV2 message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.TextInputV2} TextInputV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a TextInputV2 message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.TextInputV2} TextInputV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        TextInputV2.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a TextInputV2 message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        TextInputV2.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.portraitPlaceholder != null && message.hasOwnProperty("portraitPlaceholder")) {
                                if (!Array.isArray(message.portraitPlaceholder))
                                    return "portraitPlaceholder: array expected";
                                for (let i = 0; i < message.portraitPlaceholder.length; ++i)
                                    if (!$util.isString(message.portraitPlaceholder[i]))
                                        return "portraitPlaceholder: string[] expected";
                            }
                            if (message.landscapePlaceholder != null && message.hasOwnProperty("landscapePlaceholder")) {
                                if (!Array.isArray(message.landscapePlaceholder))
                                    return "landscapePlaceholder: array expected";
                                for (let i = 0; i < message.landscapePlaceholder.length; ++i)
                                    if (!$util.isString(message.landscapePlaceholder[i]))
                                        return "landscapePlaceholder: string[] expected";
                            }
                            if (message.renderType != null && message.hasOwnProperty("renderType"))
                                switch (message.renderType) {
                                default:
                                    return "renderType: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break;
                                }
                            if (message.placeholderPost != null && message.hasOwnProperty("placeholderPost"))
                                if (typeof message.placeholderPost !== "boolean")
                                    return "placeholderPost: boolean expected";
                            if (message.textInputLimit != null && message.hasOwnProperty("textInputLimit"))
                                if (!$util.isInteger(message.textInputLimit))
                                    return "textInputLimit: integer expected";
                            return null;
                        };

                        /**
                         * Creates a TextInputV2 message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.TextInputV2} TextInputV2
                         */
                        TextInputV2.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.TextInputV2)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.TextInputV2();
                            if (object.portraitPlaceholder) {
                                if (!Array.isArray(object.portraitPlaceholder))
                                    throw TypeError(".bilibili.community.service.dm.v1.TextInputV2.portraitPlaceholder: array expected");
                                message.portraitPlaceholder = [];
                                for (let i = 0; i < object.portraitPlaceholder.length; ++i)
                                    message.portraitPlaceholder[i] = String(object.portraitPlaceholder[i]);
                            }
                            if (object.landscapePlaceholder) {
                                if (!Array.isArray(object.landscapePlaceholder))
                                    throw TypeError(".bilibili.community.service.dm.v1.TextInputV2.landscapePlaceholder: array expected");
                                message.landscapePlaceholder = [];
                                for (let i = 0; i < object.landscapePlaceholder.length; ++i)
                                    message.landscapePlaceholder[i] = String(object.landscapePlaceholder[i]);
                            }
                            switch (object.renderType) {
                            default:
                                if (typeof object.renderType === "number") {
                                    message.renderType = object.renderType;
                                    break;
                                }
                                break;
                            case "RenderTypeNone":
                            case 0:
                                message.renderType = 0;
                                break;
                            case "RenderTypeSingle":
                            case 1:
                                message.renderType = 1;
                                break;
                            case "RenderTypeRotation":
                            case 2:
                                message.renderType = 2;
                                break;
                            }
                            if (object.placeholderPost != null)
                                message.placeholderPost = Boolean(object.placeholderPost);
                            if (object.textInputLimit != null)
                                message.textInputLimit = object.textInputLimit | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from a TextInputV2 message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.TextInputV2} message TextInputV2
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        TextInputV2.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults) {
                                object.portraitPlaceholder = [];
                                object.landscapePlaceholder = [];
                            }
                            if (options.defaults) {
                                object.renderType = options.enums === String ? "RenderTypeNone" : 0;
                                object.placeholderPost = false;
                                object.textInputLimit = 0;
                            }
                            if (message.portraitPlaceholder && message.portraitPlaceholder.length) {
                                object.portraitPlaceholder = [];
                                for (let j = 0; j < message.portraitPlaceholder.length; ++j)
                                    object.portraitPlaceholder[j] = message.portraitPlaceholder[j];
                            }
                            if (message.landscapePlaceholder && message.landscapePlaceholder.length) {
                                object.landscapePlaceholder = [];
                                for (let j = 0; j < message.landscapePlaceholder.length; ++j)
                                    object.landscapePlaceholder[j] = message.landscapePlaceholder[j];
                            }
                            if (message.renderType != null && message.hasOwnProperty("renderType"))
                                object.renderType = options.enums === String ? $root.bilibili.community.service.dm.v1.RenderType[message.renderType] === undefined ? message.renderType : $root.bilibili.community.service.dm.v1.RenderType[message.renderType] : message.renderType;
                            if (message.placeholderPost != null && message.hasOwnProperty("placeholderPost"))
                                object.placeholderPost = message.placeholderPost;
                            if (message.textInputLimit != null && message.hasOwnProperty("textInputLimit"))
                                object.textInputLimit = message.textInputLimit;
                            return object;
                        };

                        /**
                         * Converts this TextInputV2 to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        TextInputV2.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for TextInputV2
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.TextInputV2
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        TextInputV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.TextInputV2";
                        };

                        return TextInputV2;
                    })();

                    /**
                     * PostStatus enum.
                     * @name bilibili.community.service.dm.v1.PostStatus
                     * @enum {number}
                     * @property {number} PostStatusNormal=0 PostStatusNormal value
                     * @property {number} PostStatusClosed=1 PostStatusClosed value
                     */
                    v1.PostStatus = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "PostStatusNormal"] = 0;
                        values[valuesById[1] = "PostStatusClosed"] = 1;
                        return values;
                    })();

                    /**
                     * RenderType enum.
                     * @name bilibili.community.service.dm.v1.RenderType
                     * @enum {number}
                     * @property {number} RenderTypeNone=0 RenderTypeNone value
                     * @property {number} RenderTypeSingle=1 RenderTypeSingle value
                     * @property {number} RenderTypeRotation=2 RenderTypeRotation value
                     */
                    v1.RenderType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "RenderTypeNone"] = 0;
                        values[valuesById[1] = "RenderTypeSingle"] = 1;
                        values[valuesById[2] = "RenderTypeRotation"] = 2;
                        return values;
                    })();

                    v1.CheckBox = (function() {

                        /**
                         * Properties of a CheckBox.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface ICheckBox
                         * @property {string|null} [text] CheckBox text
                         * @property {bilibili.community.service.dm.v1.CheckboxType|null} [type] CheckBox type
                         * @property {boolean|null} [defaultValue] CheckBox defaultValue
                         * @property {boolean|null} [show] CheckBox show
                         */

                        /**
                         * Constructs a new CheckBox.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a CheckBox.
                         * @implements ICheckBox
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.ICheckBox=} [properties] Properties to set
                         */
                        function CheckBox(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * CheckBox text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @instance
                         */
                        CheckBox.prototype.text = "";

                        /**
                         * CheckBox type.
                         * @member {bilibili.community.service.dm.v1.CheckboxType} type
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @instance
                         */
                        CheckBox.prototype.type = 0;

                        /**
                         * CheckBox defaultValue.
                         * @member {boolean} defaultValue
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @instance
                         */
                        CheckBox.prototype.defaultValue = false;

                        /**
                         * CheckBox show.
                         * @member {boolean} show
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @instance
                         */
                        CheckBox.prototype.show = false;

                        /**
                         * Creates a new CheckBox instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @static
                         * @param {bilibili.community.service.dm.v1.ICheckBox=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.CheckBox} CheckBox instance
                         */
                        CheckBox.create = function create(properties) {
                            return new CheckBox(properties);
                        };

                        /**
                         * Encodes the specified CheckBox message. Does not implicitly {@link bilibili.community.service.dm.v1.CheckBox.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @static
                         * @param {bilibili.community.service.dm.v1.ICheckBox} message CheckBox message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        CheckBox.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                            if (message.defaultValue != null && Object.hasOwnProperty.call(message, "defaultValue"))
                                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.defaultValue);
                            if (message.show != null && Object.hasOwnProperty.call(message, "show"))
                                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.show);
                            return writer;
                        };

                        /**
                         * Encodes the specified CheckBox message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.CheckBox.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @static
                         * @param {bilibili.community.service.dm.v1.ICheckBox} message CheckBox message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        CheckBox.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a CheckBox message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.CheckBox} CheckBox
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a CheckBox message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.CheckBox} CheckBox
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        CheckBox.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a CheckBox message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        CheckBox.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.type != null && message.hasOwnProperty("type"))
                                switch (message.type) {
                                default:
                                    return "type: enum value expected";
                                case 0:
                                case 1:
                                    break;
                                }
                            if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                                if (typeof message.defaultValue !== "boolean")
                                    return "defaultValue: boolean expected";
                            if (message.show != null && message.hasOwnProperty("show"))
                                if (typeof message.show !== "boolean")
                                    return "show: boolean expected";
                            return null;
                        };

                        /**
                         * Creates a CheckBox message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.CheckBox} CheckBox
                         */
                        CheckBox.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.CheckBox)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.CheckBox();
                            if (object.text != null)
                                message.text = String(object.text);
                            switch (object.type) {
                            default:
                                if (typeof object.type === "number") {
                                    message.type = object.type;
                                    break;
                                }
                                break;
                            case "CheckboxTypeNone":
                            case 0:
                                message.type = 0;
                                break;
                            case "CheckboxTypeEncourage":
                            case 1:
                                message.type = 1;
                                break;
                            }
                            if (object.defaultValue != null)
                                message.defaultValue = Boolean(object.defaultValue);
                            if (object.show != null)
                                message.show = Boolean(object.show);
                            return message;
                        };

                        /**
                         * Creates a plain object from a CheckBox message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @static
                         * @param {bilibili.community.service.dm.v1.CheckBox} message CheckBox
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        CheckBox.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.text = "";
                                object.type = options.enums === String ? "CheckboxTypeNone" : 0;
                                object.defaultValue = false;
                                object.show = false;
                            }
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.type != null && message.hasOwnProperty("type"))
                                object.type = options.enums === String ? $root.bilibili.community.service.dm.v1.CheckboxType[message.type] === undefined ? message.type : $root.bilibili.community.service.dm.v1.CheckboxType[message.type] : message.type;
                            if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                                object.defaultValue = message.defaultValue;
                            if (message.show != null && message.hasOwnProperty("show"))
                                object.show = message.show;
                            return object;
                        };

                        /**
                         * Converts this CheckBox to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        CheckBox.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for CheckBox
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.CheckBox
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        CheckBox.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.CheckBox";
                        };

                        return CheckBox;
                    })();

                    v1.CheckBoxV2 = (function() {

                        /**
                         * Properties of a CheckBoxV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface ICheckBoxV2
                         * @property {string|null} [text] CheckBoxV2 text
                         * @property {bilibili.community.service.dm.v1.CheckboxType|null} [type] CheckBoxV2 type
                         * @property {boolean|null} [defaultValue] CheckBoxV2 defaultValue
                         */

                        /**
                         * Constructs a new CheckBoxV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a CheckBoxV2.
                         * @implements ICheckBoxV2
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.ICheckBoxV2=} [properties] Properties to set
                         */
                        function CheckBoxV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * CheckBoxV2 text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @instance
                         */
                        CheckBoxV2.prototype.text = "";

                        /**
                         * CheckBoxV2 type.
                         * @member {bilibili.community.service.dm.v1.CheckboxType} type
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @instance
                         */
                        CheckBoxV2.prototype.type = 0;

                        /**
                         * CheckBoxV2 defaultValue.
                         * @member {boolean} defaultValue
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @instance
                         */
                        CheckBoxV2.prototype.defaultValue = false;

                        /**
                         * Creates a new CheckBoxV2 instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ICheckBoxV2=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.CheckBoxV2} CheckBoxV2 instance
                         */
                        CheckBoxV2.create = function create(properties) {
                            return new CheckBoxV2(properties);
                        };

                        /**
                         * Encodes the specified CheckBoxV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.CheckBoxV2.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ICheckBoxV2} message CheckBoxV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        CheckBoxV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                            if (message.defaultValue != null && Object.hasOwnProperty.call(message, "defaultValue"))
                                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.defaultValue);
                            return writer;
                        };

                        /**
                         * Encodes the specified CheckBoxV2 message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.CheckBoxV2.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ICheckBoxV2} message CheckBoxV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        CheckBoxV2.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a CheckBoxV2 message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.CheckBoxV2} CheckBoxV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a CheckBoxV2 message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.CheckBoxV2} CheckBoxV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        CheckBoxV2.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a CheckBoxV2 message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        CheckBoxV2.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.type != null && message.hasOwnProperty("type"))
                                switch (message.type) {
                                default:
                                    return "type: enum value expected";
                                case 0:
                                case 1:
                                    break;
                                }
                            if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                                if (typeof message.defaultValue !== "boolean")
                                    return "defaultValue: boolean expected";
                            return null;
                        };

                        /**
                         * Creates a CheckBoxV2 message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.CheckBoxV2} CheckBoxV2
                         */
                        CheckBoxV2.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.CheckBoxV2)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.CheckBoxV2();
                            if (object.text != null)
                                message.text = String(object.text);
                            switch (object.type) {
                            default:
                                if (typeof object.type === "number") {
                                    message.type = object.type;
                                    break;
                                }
                                break;
                            case "CheckboxTypeNone":
                            case 0:
                                message.type = 0;
                                break;
                            case "CheckboxTypeEncourage":
                            case 1:
                                message.type = 1;
                                break;
                            }
                            if (object.defaultValue != null)
                                message.defaultValue = Boolean(object.defaultValue);
                            return message;
                        };

                        /**
                         * Creates a plain object from a CheckBoxV2 message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.CheckBoxV2} message CheckBoxV2
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        CheckBoxV2.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.text = "";
                                object.type = options.enums === String ? "CheckboxTypeNone" : 0;
                                object.defaultValue = false;
                            }
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.type != null && message.hasOwnProperty("type"))
                                object.type = options.enums === String ? $root.bilibili.community.service.dm.v1.CheckboxType[message.type] === undefined ? message.type : $root.bilibili.community.service.dm.v1.CheckboxType[message.type] : message.type;
                            if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                                object.defaultValue = message.defaultValue;
                            return object;
                        };

                        /**
                         * Converts this CheckBoxV2 to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        CheckBoxV2.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for CheckBoxV2
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.CheckBoxV2
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        CheckBoxV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.CheckBoxV2";
                        };

                        return CheckBoxV2;
                    })();

                    /**
                     * CheckboxType enum.
                     * @name bilibili.community.service.dm.v1.CheckboxType
                     * @enum {number}
                     * @property {number} CheckboxTypeNone=0 CheckboxTypeNone value
                     * @property {number} CheckboxTypeEncourage=1 CheckboxTypeEncourage value
                     */
                    v1.CheckboxType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "CheckboxTypeNone"] = 0;
                        values[valuesById[1] = "CheckboxTypeEncourage"] = 1;
                        return values;
                    })();

                    v1.Toast = (function() {

                        /**
                         * Properties of a Toast.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IToast
                         * @property {string|null} [text] Toast text
                         * @property {number|null} [duration] Toast duration
                         * @property {boolean|null} [show] Toast show
                         * @property {bilibili.community.service.dm.v1.IButton|null} [button] Toast button
                         */

                        /**
                         * Constructs a new Toast.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a Toast.
                         * @implements IToast
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IToast=} [properties] Properties to set
                         */
                        function Toast(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * Toast text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @instance
                         */
                        Toast.prototype.text = "";

                        /**
                         * Toast duration.
                         * @member {number} duration
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @instance
                         */
                        Toast.prototype.duration = 0;

                        /**
                         * Toast show.
                         * @member {boolean} show
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @instance
                         */
                        Toast.prototype.show = false;

                        /**
                         * Toast button.
                         * @member {bilibili.community.service.dm.v1.IButton|null|undefined} button
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @instance
                         */
                        Toast.prototype.button = null;

                        /**
                         * Creates a new Toast instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @static
                         * @param {bilibili.community.service.dm.v1.IToast=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.Toast} Toast instance
                         */
                        Toast.create = function create(properties) {
                            return new Toast(properties);
                        };

                        /**
                         * Encodes the specified Toast message. Does not implicitly {@link bilibili.community.service.dm.v1.Toast.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @static
                         * @param {bilibili.community.service.dm.v1.IToast} message Toast message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Toast.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.duration);
                            if (message.show != null && Object.hasOwnProperty.call(message, "show"))
                                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.show);
                            if (message.button != null && Object.hasOwnProperty.call(message, "button"))
                                $root.bilibili.community.service.dm.v1.Button.encode(message.button, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified Toast message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.Toast.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @static
                         * @param {bilibili.community.service.dm.v1.IToast} message Toast message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Toast.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a Toast message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.Toast} Toast
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a Toast message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.Toast} Toast
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Toast.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a Toast message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Toast.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.duration != null && message.hasOwnProperty("duration"))
                                if (!$util.isInteger(message.duration))
                                    return "duration: integer expected";
                            if (message.show != null && message.hasOwnProperty("show"))
                                if (typeof message.show !== "boolean")
                                    return "show: boolean expected";
                            if (message.button != null && message.hasOwnProperty("button")) {
                                let error = $root.bilibili.community.service.dm.v1.Button.verify(message.button);
                                if (error)
                                    return "button." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates a Toast message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.Toast} Toast
                         */
                        Toast.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.Toast)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.Toast();
                            if (object.text != null)
                                message.text = String(object.text);
                            if (object.duration != null)
                                message.duration = object.duration | 0;
                            if (object.show != null)
                                message.show = Boolean(object.show);
                            if (object.button != null) {
                                if (typeof object.button !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.Toast.button: object expected");
                                message.button = $root.bilibili.community.service.dm.v1.Button.fromObject(object.button);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a Toast message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @static
                         * @param {bilibili.community.service.dm.v1.Toast} message Toast
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        Toast.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.text = "";
                                object.duration = 0;
                                object.show = false;
                                object.button = null;
                            }
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.duration != null && message.hasOwnProperty("duration"))
                                object.duration = message.duration;
                            if (message.show != null && message.hasOwnProperty("show"))
                                object.show = message.show;
                            if (message.button != null && message.hasOwnProperty("button"))
                                object.button = $root.bilibili.community.service.dm.v1.Button.toObject(message.button, options);
                            return object;
                        };

                        /**
                         * Converts this Toast to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Toast.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for Toast
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.Toast
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        Toast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Toast";
                        };

                        return Toast;
                    })();

                    v1.ToastV2 = (function() {

                        /**
                         * Properties of a ToastV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IToastV2
                         * @property {string|null} [text] ToastV2 text
                         * @property {number|null} [duration] ToastV2 duration
                         * @property {bilibili.community.service.dm.v1.IToastButtonV2|null} [toastButtonV2] ToastV2 toastButtonV2
                         */

                        /**
                         * Constructs a new ToastV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a ToastV2.
                         * @implements IToastV2
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IToastV2=} [properties] Properties to set
                         */
                        function ToastV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * ToastV2 text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @instance
                         */
                        ToastV2.prototype.text = "";

                        /**
                         * ToastV2 duration.
                         * @member {number} duration
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @instance
                         */
                        ToastV2.prototype.duration = 0;

                        /**
                         * ToastV2 toastButtonV2.
                         * @member {bilibili.community.service.dm.v1.IToastButtonV2|null|undefined} toastButtonV2
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @instance
                         */
                        ToastV2.prototype.toastButtonV2 = null;

                        /**
                         * Creates a new ToastV2 instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IToastV2=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.ToastV2} ToastV2 instance
                         */
                        ToastV2.create = function create(properties) {
                            return new ToastV2(properties);
                        };

                        /**
                         * Encodes the specified ToastV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.ToastV2.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IToastV2} message ToastV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ToastV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.duration);
                            if (message.toastButtonV2 != null && Object.hasOwnProperty.call(message, "toastButtonV2"))
                                $root.bilibili.community.service.dm.v1.ToastButtonV2.encode(message.toastButtonV2, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified ToastV2 message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.ToastV2.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IToastV2} message ToastV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ToastV2.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a ToastV2 message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.ToastV2} ToastV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a ToastV2 message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.ToastV2} ToastV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ToastV2.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a ToastV2 message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ToastV2.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.duration != null && message.hasOwnProperty("duration"))
                                if (!$util.isInteger(message.duration))
                                    return "duration: integer expected";
                            if (message.toastButtonV2 != null && message.hasOwnProperty("toastButtonV2")) {
                                let error = $root.bilibili.community.service.dm.v1.ToastButtonV2.verify(message.toastButtonV2);
                                if (error)
                                    return "toastButtonV2." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates a ToastV2 message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.ToastV2} ToastV2
                         */
                        ToastV2.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.ToastV2)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.ToastV2();
                            if (object.text != null)
                                message.text = String(object.text);
                            if (object.duration != null)
                                message.duration = object.duration | 0;
                            if (object.toastButtonV2 != null) {
                                if (typeof object.toastButtonV2 !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.ToastV2.toastButtonV2: object expected");
                                message.toastButtonV2 = $root.bilibili.community.service.dm.v1.ToastButtonV2.fromObject(object.toastButtonV2);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a ToastV2 message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ToastV2} message ToastV2
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ToastV2.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.text = "";
                                object.duration = 0;
                                object.toastButtonV2 = null;
                            }
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.duration != null && message.hasOwnProperty("duration"))
                                object.duration = message.duration;
                            if (message.toastButtonV2 != null && message.hasOwnProperty("toastButtonV2"))
                                object.toastButtonV2 = $root.bilibili.community.service.dm.v1.ToastButtonV2.toObject(message.toastButtonV2, options);
                            return object;
                        };

                        /**
                         * Converts this ToastV2 to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ToastV2.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for ToastV2
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.ToastV2
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        ToastV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.ToastV2";
                        };

                        return ToastV2;
                    })();

                    v1.BubbleV2 = (function() {

                        /**
                         * Properties of a BubbleV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IBubbleV2
                         * @property {string|null} [text] BubbleV2 text
                         * @property {string|null} [url] BubbleV2 url
                         * @property {bilibili.community.service.dm.v1.BubbleType|null} [bubbleType] BubbleV2 bubbleType
                         * @property {boolean|null} [exposureOnce] BubbleV2 exposureOnce
                         * @property {bilibili.community.service.dm.v1.ExposureType|null} [exposureType] BubbleV2 exposureType
                         */

                        /**
                         * Constructs a new BubbleV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a BubbleV2.
                         * @implements IBubbleV2
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IBubbleV2=} [properties] Properties to set
                         */
                        function BubbleV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * BubbleV2 text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @instance
                         */
                        BubbleV2.prototype.text = "";

                        /**
                         * BubbleV2 url.
                         * @member {string} url
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @instance
                         */
                        BubbleV2.prototype.url = "";

                        /**
                         * BubbleV2 bubbleType.
                         * @member {bilibili.community.service.dm.v1.BubbleType} bubbleType
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @instance
                         */
                        BubbleV2.prototype.bubbleType = 0;

                        /**
                         * BubbleV2 exposureOnce.
                         * @member {boolean} exposureOnce
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @instance
                         */
                        BubbleV2.prototype.exposureOnce = false;

                        /**
                         * BubbleV2 exposureType.
                         * @member {bilibili.community.service.dm.v1.ExposureType} exposureType
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @instance
                         */
                        BubbleV2.prototype.exposureType = 0;

                        /**
                         * Creates a new BubbleV2 instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IBubbleV2=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.BubbleV2} BubbleV2 instance
                         */
                        BubbleV2.create = function create(properties) {
                            return new BubbleV2(properties);
                        };

                        /**
                         * Encodes the specified BubbleV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.BubbleV2.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IBubbleV2} message BubbleV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        BubbleV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.url);
                            if (message.bubbleType != null && Object.hasOwnProperty.call(message, "bubbleType"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.bubbleType);
                            if (message.exposureOnce != null && Object.hasOwnProperty.call(message, "exposureOnce"))
                                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.exposureOnce);
                            if (message.exposureType != null && Object.hasOwnProperty.call(message, "exposureType"))
                                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.exposureType);
                            return writer;
                        };

                        /**
                         * Encodes the specified BubbleV2 message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.BubbleV2.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IBubbleV2} message BubbleV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        BubbleV2.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a BubbleV2 message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.BubbleV2} BubbleV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a BubbleV2 message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.BubbleV2} BubbleV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        BubbleV2.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a BubbleV2 message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        BubbleV2.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.url != null && message.hasOwnProperty("url"))
                                if (!$util.isString(message.url))
                                    return "url: string expected";
                            if (message.bubbleType != null && message.hasOwnProperty("bubbleType"))
                                switch (message.bubbleType) {
                                default:
                                    return "bubbleType: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break;
                                }
                            if (message.exposureOnce != null && message.hasOwnProperty("exposureOnce"))
                                if (typeof message.exposureOnce !== "boolean")
                                    return "exposureOnce: boolean expected";
                            if (message.exposureType != null && message.hasOwnProperty("exposureType"))
                                switch (message.exposureType) {
                                default:
                                    return "exposureType: enum value expected";
                                case 0:
                                case 1:
                                    break;
                                }
                            return null;
                        };

                        /**
                         * Creates a BubbleV2 message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.BubbleV2} BubbleV2
                         */
                        BubbleV2.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.BubbleV2)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.BubbleV2();
                            if (object.text != null)
                                message.text = String(object.text);
                            if (object.url != null)
                                message.url = String(object.url);
                            switch (object.bubbleType) {
                            default:
                                if (typeof object.bubbleType === "number") {
                                    message.bubbleType = object.bubbleType;
                                    break;
                                }
                                break;
                            case "BubbleTypeNone":
                            case 0:
                                message.bubbleType = 0;
                                break;
                            case "BubbleTypeClickButton":
                            case 1:
                                message.bubbleType = 1;
                                break;
                            case "BubbleTypeDmSettingPanel":
                            case 2:
                                message.bubbleType = 2;
                                break;
                            }
                            if (object.exposureOnce != null)
                                message.exposureOnce = Boolean(object.exposureOnce);
                            switch (object.exposureType) {
                            default:
                                if (typeof object.exposureType === "number") {
                                    message.exposureType = object.exposureType;
                                    break;
                                }
                                break;
                            case "ExposureTypeNone":
                            case 0:
                                message.exposureType = 0;
                                break;
                            case "ExposureTypeDMSend":
                            case 1:
                                message.exposureType = 1;
                                break;
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a BubbleV2 message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.BubbleV2} message BubbleV2
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        BubbleV2.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.text = "";
                                object.url = "";
                                object.bubbleType = options.enums === String ? "BubbleTypeNone" : 0;
                                object.exposureOnce = false;
                                object.exposureType = options.enums === String ? "ExposureTypeNone" : 0;
                            }
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.url != null && message.hasOwnProperty("url"))
                                object.url = message.url;
                            if (message.bubbleType != null && message.hasOwnProperty("bubbleType"))
                                object.bubbleType = options.enums === String ? $root.bilibili.community.service.dm.v1.BubbleType[message.bubbleType] === undefined ? message.bubbleType : $root.bilibili.community.service.dm.v1.BubbleType[message.bubbleType] : message.bubbleType;
                            if (message.exposureOnce != null && message.hasOwnProperty("exposureOnce"))
                                object.exposureOnce = message.exposureOnce;
                            if (message.exposureType != null && message.hasOwnProperty("exposureType"))
                                object.exposureType = options.enums === String ? $root.bilibili.community.service.dm.v1.ExposureType[message.exposureType] === undefined ? message.exposureType : $root.bilibili.community.service.dm.v1.ExposureType[message.exposureType] : message.exposureType;
                            return object;
                        };

                        /**
                         * Converts this BubbleV2 to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        BubbleV2.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for BubbleV2
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.BubbleV2
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        BubbleV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.BubbleV2";
                        };

                        return BubbleV2;
                    })();

                    /**
                     * BubbleType enum.
                     * @name bilibili.community.service.dm.v1.BubbleType
                     * @enum {number}
                     * @property {number} BubbleTypeNone=0 BubbleTypeNone value
                     * @property {number} BubbleTypeClickButton=1 BubbleTypeClickButton value
                     * @property {number} BubbleTypeDmSettingPanel=2 BubbleTypeDmSettingPanel value
                     */
                    v1.BubbleType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "BubbleTypeNone"] = 0;
                        values[valuesById[1] = "BubbleTypeClickButton"] = 1;
                        values[valuesById[2] = "BubbleTypeDmSettingPanel"] = 2;
                        return values;
                    })();

                    v1.LabelV2 = (function() {

                        /**
                         * Properties of a LabelV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface ILabelV2
                         * @property {string|null} [title] LabelV2 title
                         * @property {Array.<string>|null} [content] LabelV2 content
                         * @property {boolean|null} [exposureOnce] LabelV2 exposureOnce
                         * @property {bilibili.community.service.dm.v1.ExposureType|null} [exposureType] LabelV2 exposureType
                         */

                        /**
                         * Constructs a new LabelV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a LabelV2.
                         * @implements ILabelV2
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.ILabelV2=} [properties] Properties to set
                         */
                        function LabelV2(properties) {
                            this.content = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * LabelV2 title.
                         * @member {string} title
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @instance
                         */
                        LabelV2.prototype.title = "";

                        /**
                         * LabelV2 content.
                         * @member {Array.<string>} content
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @instance
                         */
                        LabelV2.prototype.content = $util.emptyArray;

                        /**
                         * LabelV2 exposureOnce.
                         * @member {boolean} exposureOnce
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @instance
                         */
                        LabelV2.prototype.exposureOnce = false;

                        /**
                         * LabelV2 exposureType.
                         * @member {bilibili.community.service.dm.v1.ExposureType} exposureType
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @instance
                         */
                        LabelV2.prototype.exposureType = 0;

                        /**
                         * Creates a new LabelV2 instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ILabelV2=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.LabelV2} LabelV2 instance
                         */
                        LabelV2.create = function create(properties) {
                            return new LabelV2(properties);
                        };

                        /**
                         * Encodes the specified LabelV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.LabelV2.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ILabelV2} message LabelV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        LabelV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
                            if (message.content != null && message.content.length)
                                for (let i = 0; i < message.content.length; ++i)
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.content[i]);
                            if (message.exposureOnce != null && Object.hasOwnProperty.call(message, "exposureOnce"))
                                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.exposureOnce);
                            if (message.exposureType != null && Object.hasOwnProperty.call(message, "exposureType"))
                                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.exposureType);
                            return writer;
                        };

                        /**
                         * Encodes the specified LabelV2 message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.LabelV2.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ILabelV2} message LabelV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        LabelV2.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a LabelV2 message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.LabelV2} LabelV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a LabelV2 message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.LabelV2} LabelV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        LabelV2.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a LabelV2 message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        LabelV2.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.title != null && message.hasOwnProperty("title"))
                                if (!$util.isString(message.title))
                                    return "title: string expected";
                            if (message.content != null && message.hasOwnProperty("content")) {
                                if (!Array.isArray(message.content))
                                    return "content: array expected";
                                for (let i = 0; i < message.content.length; ++i)
                                    if (!$util.isString(message.content[i]))
                                        return "content: string[] expected";
                            }
                            if (message.exposureOnce != null && message.hasOwnProperty("exposureOnce"))
                                if (typeof message.exposureOnce !== "boolean")
                                    return "exposureOnce: boolean expected";
                            if (message.exposureType != null && message.hasOwnProperty("exposureType"))
                                switch (message.exposureType) {
                                default:
                                    return "exposureType: enum value expected";
                                case 0:
                                case 1:
                                    break;
                                }
                            return null;
                        };

                        /**
                         * Creates a LabelV2 message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.LabelV2} LabelV2
                         */
                        LabelV2.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.LabelV2)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.LabelV2();
                            if (object.title != null)
                                message.title = String(object.title);
                            if (object.content) {
                                if (!Array.isArray(object.content))
                                    throw TypeError(".bilibili.community.service.dm.v1.LabelV2.content: array expected");
                                message.content = [];
                                for (let i = 0; i < object.content.length; ++i)
                                    message.content[i] = String(object.content[i]);
                            }
                            if (object.exposureOnce != null)
                                message.exposureOnce = Boolean(object.exposureOnce);
                            switch (object.exposureType) {
                            default:
                                if (typeof object.exposureType === "number") {
                                    message.exposureType = object.exposureType;
                                    break;
                                }
                                break;
                            case "ExposureTypeNone":
                            case 0:
                                message.exposureType = 0;
                                break;
                            case "ExposureTypeDMSend":
                            case 1:
                                message.exposureType = 1;
                                break;
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a LabelV2 message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.LabelV2} message LabelV2
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        LabelV2.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults)
                                object.content = [];
                            if (options.defaults) {
                                object.title = "";
                                object.exposureOnce = false;
                                object.exposureType = options.enums === String ? "ExposureTypeNone" : 0;
                            }
                            if (message.title != null && message.hasOwnProperty("title"))
                                object.title = message.title;
                            if (message.content && message.content.length) {
                                object.content = [];
                                for (let j = 0; j < message.content.length; ++j)
                                    object.content[j] = message.content[j];
                            }
                            if (message.exposureOnce != null && message.hasOwnProperty("exposureOnce"))
                                object.exposureOnce = message.exposureOnce;
                            if (message.exposureType != null && message.hasOwnProperty("exposureType"))
                                object.exposureType = options.enums === String ? $root.bilibili.community.service.dm.v1.ExposureType[message.exposureType] === undefined ? message.exposureType : $root.bilibili.community.service.dm.v1.ExposureType[message.exposureType] : message.exposureType;
                            return object;
                        };

                        /**
                         * Converts this LabelV2 to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        LabelV2.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for LabelV2
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.LabelV2
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        LabelV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.LabelV2";
                        };

                        return LabelV2;
                    })();

                    /**
                     * ExposureType enum.
                     * @name bilibili.community.service.dm.v1.ExposureType
                     * @enum {number}
                     * @property {number} ExposureTypeNone=0 ExposureTypeNone value
                     * @property {number} ExposureTypeDMSend=1 ExposureTypeDMSend value
                     */
                    v1.ExposureType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "ExposureTypeNone"] = 0;
                        values[valuesById[1] = "ExposureTypeDMSend"] = 1;
                        return values;
                    })();

                    v1.ToastButtonV2 = (function() {

                        /**
                         * Properties of a ToastButtonV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IToastButtonV2
                         * @property {string|null} [text] ToastButtonV2 text
                         * @property {bilibili.community.service.dm.v1.ToastFunctionType|null} [action] ToastButtonV2 action
                         */

                        /**
                         * Constructs a new ToastButtonV2.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a ToastButtonV2.
                         * @implements IToastButtonV2
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IToastButtonV2=} [properties] Properties to set
                         */
                        function ToastButtonV2(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * ToastButtonV2 text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @instance
                         */
                        ToastButtonV2.prototype.text = "";

                        /**
                         * ToastButtonV2 action.
                         * @member {bilibili.community.service.dm.v1.ToastFunctionType} action
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @instance
                         */
                        ToastButtonV2.prototype.action = 0;

                        /**
                         * Creates a new ToastButtonV2 instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IToastButtonV2=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.ToastButtonV2} ToastButtonV2 instance
                         */
                        ToastButtonV2.create = function create(properties) {
                            return new ToastButtonV2(properties);
                        };

                        /**
                         * Encodes the specified ToastButtonV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.ToastButtonV2.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IToastButtonV2} message ToastButtonV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ToastButtonV2.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.action);
                            return writer;
                        };

                        /**
                         * Encodes the specified ToastButtonV2 message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.ToastButtonV2.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.IToastButtonV2} message ToastButtonV2 message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ToastButtonV2.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a ToastButtonV2 message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.ToastButtonV2} ToastButtonV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a ToastButtonV2 message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.ToastButtonV2} ToastButtonV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ToastButtonV2.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a ToastButtonV2 message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ToastButtonV2.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.action != null && message.hasOwnProperty("action"))
                                switch (message.action) {
                                default:
                                    return "action: enum value expected";
                                case 0:
                                case 1:
                                    break;
                                }
                            return null;
                        };

                        /**
                         * Creates a ToastButtonV2 message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.ToastButtonV2} ToastButtonV2
                         */
                        ToastButtonV2.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.ToastButtonV2)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.ToastButtonV2();
                            if (object.text != null)
                                message.text = String(object.text);
                            switch (object.action) {
                            default:
                                if (typeof object.action === "number") {
                                    message.action = object.action;
                                    break;
                                }
                                break;
                            case "ToastFunctionTypeNone":
                            case 0:
                                message.action = 0;
                                break;
                            case "ToastFunctionTypePostPanel":
                            case 1:
                                message.action = 1;
                                break;
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a ToastButtonV2 message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @static
                         * @param {bilibili.community.service.dm.v1.ToastButtonV2} message ToastButtonV2
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ToastButtonV2.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.text = "";
                                object.action = options.enums === String ? "ToastFunctionTypeNone" : 0;
                            }
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.action != null && message.hasOwnProperty("action"))
                                object.action = options.enums === String ? $root.bilibili.community.service.dm.v1.ToastFunctionType[message.action] === undefined ? message.action : $root.bilibili.community.service.dm.v1.ToastFunctionType[message.action] : message.action;
                            return object;
                        };

                        /**
                         * Converts this ToastButtonV2 to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ToastButtonV2.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for ToastButtonV2
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.ToastButtonV2
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        ToastButtonV2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.ToastButtonV2";
                        };

                        return ToastButtonV2;
                    })();

                    v1.Button = (function() {

                        /**
                         * Properties of a Button.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IButton
                         * @property {string|null} [text] Button text
                         * @property {bilibili.community.service.dm.v1.ToastFunctionType|null} [action] Button action
                         */

                        /**
                         * Constructs a new Button.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a Button.
                         * @implements IButton
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IButton=} [properties] Properties to set
                         */
                        function Button(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * Button text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @instance
                         */
                        Button.prototype.text = "";

                        /**
                         * Button action.
                         * @member {bilibili.community.service.dm.v1.ToastFunctionType} action
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @instance
                         */
                        Button.prototype.action = 0;

                        /**
                         * Creates a new Button instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @static
                         * @param {bilibili.community.service.dm.v1.IButton=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.Button} Button instance
                         */
                        Button.create = function create(properties) {
                            return new Button(properties);
                        };

                        /**
                         * Encodes the specified Button message. Does not implicitly {@link bilibili.community.service.dm.v1.Button.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @static
                         * @param {bilibili.community.service.dm.v1.IButton} message Button message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Button.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
                            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.action);
                            return writer;
                        };

                        /**
                         * Encodes the specified Button message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.Button.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @static
                         * @param {bilibili.community.service.dm.v1.IButton} message Button message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Button.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a Button message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.Button} Button
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a Button message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.Button} Button
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Button.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a Button message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Button.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.action != null && message.hasOwnProperty("action"))
                                switch (message.action) {
                                default:
                                    return "action: enum value expected";
                                case 0:
                                case 1:
                                    break;
                                }
                            return null;
                        };

                        /**
                         * Creates a Button message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.Button} Button
                         */
                        Button.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.Button)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.Button();
                            if (object.text != null)
                                message.text = String(object.text);
                            switch (object.action) {
                            default:
                                if (typeof object.action === "number") {
                                    message.action = object.action;
                                    break;
                                }
                                break;
                            case "ToastFunctionTypeNone":
                            case 0:
                                message.action = 0;
                                break;
                            case "ToastFunctionTypePostPanel":
                            case 1:
                                message.action = 1;
                                break;
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a Button message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @static
                         * @param {bilibili.community.service.dm.v1.Button} message Button
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        Button.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.text = "";
                                object.action = options.enums === String ? "ToastFunctionTypeNone" : 0;
                            }
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.action != null && message.hasOwnProperty("action"))
                                object.action = options.enums === String ? $root.bilibili.community.service.dm.v1.ToastFunctionType[message.action] === undefined ? message.action : $root.bilibili.community.service.dm.v1.ToastFunctionType[message.action] : message.action;
                            return object;
                        };

                        /**
                         * Converts this Button to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Button.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for Button
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.Button
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        Button.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Button";
                        };

                        return Button;
                    })();

                    /**
                     * ToastFunctionType enum.
                     * @name bilibili.community.service.dm.v1.ToastFunctionType
                     * @enum {number}
                     * @property {number} ToastFunctionTypeNone=0 ToastFunctionTypeNone value
                     * @property {number} ToastFunctionTypePostPanel=1 ToastFunctionTypePostPanel value
                     */
                    v1.ToastFunctionType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "ToastFunctionTypeNone"] = 0;
                        values[valuesById[1] = "ToastFunctionTypePostPanel"] = 1;
                        return values;
                    })();

                    /**
                     * ToastBizType enum.
                     * @name bilibili.community.service.dm.v1.ToastBizType
                     * @enum {number}
                     * @property {number} ToastBizTypeNone=0 ToastBizTypeNone value
                     * @property {number} ToastBizTypeEncourage=1 ToastBizTypeEncourage value
                     */
                    v1.ToastBizType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "ToastBizTypeNone"] = 0;
                        values[valuesById[1] = "ToastBizTypeEncourage"] = 1;
                        return values;
                    })();

                    v1.CommandDm = (function() {

                        /**
                         * Properties of a CommandDm.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface ICommandDm
                         * @property {number|Long|null} [oid] CommandDm oid
                         * @property {number|Long|null} [mid] CommandDm mid
                         * @property {string|null} [command] CommandDm command
                         * @property {string|null} [text] CommandDm text
                         * @property {number|null} [stime] CommandDm stime
                         * @property {string|null} [ctime] CommandDm ctime
                         * @property {string|null} [mtime] CommandDm mtime
                         * @property {string|null} [extra] CommandDm extra
                         * @property {string|null} [dmid] CommandDm dmid
                         */

                        /**
                         * Constructs a new CommandDm.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a CommandDm.
                         * @implements ICommandDm
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.ICommandDm=} [properties] Properties to set
                         */
                        function CommandDm(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * CommandDm oid.
                         * @member {number|Long} oid
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * CommandDm mid.
                         * @member {number|Long} mid
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.mid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * CommandDm command.
                         * @member {string} command
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.command = "";

                        /**
                         * CommandDm text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.text = "";

                        /**
                         * CommandDm stime.
                         * @member {number} stime
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.stime = 0;

                        /**
                         * CommandDm ctime.
                         * @member {string} ctime
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.ctime = "";

                        /**
                         * CommandDm mtime.
                         * @member {string} mtime
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.mtime = "";

                        /**
                         * CommandDm extra.
                         * @member {string} extra
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.extra = "";

                        /**
                         * CommandDm dmid.
                         * @member {string} dmid
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.dmid = "";

                        /**
                         * Creates a new CommandDm instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @static
                         * @param {bilibili.community.service.dm.v1.ICommandDm=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.CommandDm} CommandDm instance
                         */
                        CommandDm.create = function create(properties) {
                            return new CommandDm(properties);
                        };

                        /**
                         * Encodes the specified CommandDm message. Does not implicitly {@link bilibili.community.service.dm.v1.CommandDm.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @static
                         * @param {bilibili.community.service.dm.v1.ICommandDm} message CommandDm message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        CommandDm.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.oid != null && Object.hasOwnProperty.call(message, "oid"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.oid);
                            if (message.mid != null && Object.hasOwnProperty.call(message, "mid"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.mid);
                            if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                                writer.uint32(/* id 4, wireType 2 =*/34).string(message.command);
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 5, wireType 2 =*/42).string(message.text);
                            if (message.stime != null && Object.hasOwnProperty.call(message, "stime"))
                                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.stime);
                            if (message.ctime != null && Object.hasOwnProperty.call(message, "ctime"))
                                writer.uint32(/* id 7, wireType 2 =*/58).string(message.ctime);
                            if (message.mtime != null && Object.hasOwnProperty.call(message, "mtime"))
                                writer.uint32(/* id 8, wireType 2 =*/66).string(message.mtime);
                            if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
                                writer.uint32(/* id 9, wireType 2 =*/74).string(message.extra);
                            if (message.dmid != null && Object.hasOwnProperty.call(message, "dmid"))
                                writer.uint32(/* id 10, wireType 2 =*/82).string(message.dmid);
                            return writer;
                        };

                        /**
                         * Encodes the specified CommandDm message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.CommandDm.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @static
                         * @param {bilibili.community.service.dm.v1.ICommandDm} message CommandDm message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        CommandDm.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a CommandDm message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.CommandDm} CommandDm
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a CommandDm message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.CommandDm} CommandDm
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        CommandDm.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a CommandDm message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        CommandDm.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.oid != null && message.hasOwnProperty("oid"))
                                if (!$util.isInteger(message.oid) && !(message.oid && $util.isInteger(message.oid.low) && $util.isInteger(message.oid.high)))
                                    return "oid: integer|Long expected";
                            if (message.mid != null && message.hasOwnProperty("mid"))
                                if (!$util.isInteger(message.mid) && !(message.mid && $util.isInteger(message.mid.low) && $util.isInteger(message.mid.high)))
                                    return "mid: integer|Long expected";
                            if (message.command != null && message.hasOwnProperty("command"))
                                if (!$util.isString(message.command))
                                    return "command: string expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.stime != null && message.hasOwnProperty("stime"))
                                if (!$util.isInteger(message.stime))
                                    return "stime: integer expected";
                            if (message.ctime != null && message.hasOwnProperty("ctime"))
                                if (!$util.isString(message.ctime))
                                    return "ctime: string expected";
                            if (message.mtime != null && message.hasOwnProperty("mtime"))
                                if (!$util.isString(message.mtime))
                                    return "mtime: string expected";
                            if (message.extra != null && message.hasOwnProperty("extra"))
                                if (!$util.isString(message.extra))
                                    return "extra: string expected";
                            if (message.dmid != null && message.hasOwnProperty("dmid"))
                                if (!$util.isString(message.dmid))
                                    return "dmid: string expected";
                            return null;
                        };

                        /**
                         * Creates a CommandDm message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.CommandDm} CommandDm
                         */
                        CommandDm.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.CommandDm)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.CommandDm();
                            if (object.oid != null)
                                if ($util.Long)
                                    (message.oid = $util.Long.fromValue(object.oid)).unsigned = false;
                                else if (typeof object.oid === "string")
                                    message.oid = parseInt(object.oid, 10);
                                else if (typeof object.oid === "number")
                                    message.oid = object.oid;
                                else if (typeof object.oid === "object")
                                    message.oid = new $util.LongBits(object.oid.low >>> 0, object.oid.high >>> 0).toNumber();
                            if (object.mid != null)
                                if ($util.Long)
                                    (message.mid = $util.Long.fromValue(object.mid)).unsigned = false;
                                else if (typeof object.mid === "string")
                                    message.mid = parseInt(object.mid, 10);
                                else if (typeof object.mid === "number")
                                    message.mid = object.mid;
                                else if (typeof object.mid === "object")
                                    message.mid = new $util.LongBits(object.mid.low >>> 0, object.mid.high >>> 0).toNumber();
                            if (object.command != null)
                                message.command = String(object.command);
                            if (object.text != null)
                                message.text = String(object.text);
                            if (object.stime != null)
                                message.stime = object.stime | 0;
                            if (object.ctime != null)
                                message.ctime = String(object.ctime);
                            if (object.mtime != null)
                                message.mtime = String(object.mtime);
                            if (object.extra != null)
                                message.extra = String(object.extra);
                            if (object.dmid != null)
                                message.dmid = String(object.dmid);
                            return message;
                        };

                        /**
                         * Creates a plain object from a CommandDm message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @static
                         * @param {bilibili.community.service.dm.v1.CommandDm} message CommandDm
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        CommandDm.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.oid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.oid = options.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.mid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.mid = options.longs === String ? "0" : 0;
                                object.command = "";
                                object.text = "";
                                object.stime = 0;
                                object.ctime = "";
                                object.mtime = "";
                                object.extra = "";
                                object.dmid = "";
                            }
                            if (message.oid != null && message.hasOwnProperty("oid"))
                                if (typeof message.oid === "number")
                                    object.oid = options.longs === String ? String(message.oid) : message.oid;
                                else
                                    object.oid = options.longs === String ? $util.Long.prototype.toString.call(message.oid) : options.longs === Number ? new $util.LongBits(message.oid.low >>> 0, message.oid.high >>> 0).toNumber() : message.oid;
                            if (message.mid != null && message.hasOwnProperty("mid"))
                                if (typeof message.mid === "number")
                                    object.mid = options.longs === String ? String(message.mid) : message.mid;
                                else
                                    object.mid = options.longs === String ? $util.Long.prototype.toString.call(message.mid) : options.longs === Number ? new $util.LongBits(message.mid.low >>> 0, message.mid.high >>> 0).toNumber() : message.mid;
                            if (message.command != null && message.hasOwnProperty("command"))
                                object.command = message.command;
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.stime != null && message.hasOwnProperty("stime"))
                                object.stime = message.stime;
                            if (message.ctime != null && message.hasOwnProperty("ctime"))
                                object.ctime = message.ctime;
                            if (message.mtime != null && message.hasOwnProperty("mtime"))
                                object.mtime = message.mtime;
                            if (message.extra != null && message.hasOwnProperty("extra"))
                                object.extra = message.extra;
                            if (message.dmid != null && message.hasOwnProperty("dmid"))
                                object.dmid = message.dmid;
                            return object;
                        };

                        /**
                         * Converts this CommandDm to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        CommandDm.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for CommandDm
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        CommandDm.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.CommandDm";
                        };

                        return CommandDm;
                    })();

                    v1.DmSegConfig = (function() {

                        /**
                         * Properties of a DmSegConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmSegConfig
                         * @property {number|Long|null} [pageSize] DmSegConfig pageSize
                         * @property {number|Long|null} [total] DmSegConfig total
                         */

                        /**
                         * Constructs a new DmSegConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmSegConfig.
                         * @implements IDmSegConfig
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmSegConfig=} [properties] Properties to set
                         */
                        function DmSegConfig(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DmSegConfig pageSize.
                         * @member {number|Long} pageSize
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @instance
                         */
                        DmSegConfig.prototype.pageSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DmSegConfig total.
                         * @member {number|Long} total
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @instance
                         */
                        DmSegConfig.prototype.total = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * Creates a new DmSegConfig instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegConfig=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DmSegConfig} DmSegConfig instance
                         */
                        DmSegConfig.create = function create(properties) {
                            return new DmSegConfig(properties);
                        };

                        /**
                         * Encodes the specified DmSegConfig message. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegConfig.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegConfig} message DmSegConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSegConfig.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.pageSize != null && Object.hasOwnProperty.call(message, "pageSize"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.pageSize);
                            if (message.total != null && Object.hasOwnProperty.call(message, "total"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.total);
                            return writer;
                        };

                        /**
                         * Encodes the specified DmSegConfig message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegConfig.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegConfig} message DmSegConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSegConfig.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DmSegConfig message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmSegConfig} DmSegConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a DmSegConfig message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DmSegConfig} DmSegConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmSegConfig.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DmSegConfig message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DmSegConfig.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.pageSize != null && message.hasOwnProperty("pageSize"))
                                if (!$util.isInteger(message.pageSize) && !(message.pageSize && $util.isInteger(message.pageSize.low) && $util.isInteger(message.pageSize.high)))
                                    return "pageSize: integer|Long expected";
                            if (message.total != null && message.hasOwnProperty("total"))
                                if (!$util.isInteger(message.total) && !(message.total && $util.isInteger(message.total.low) && $util.isInteger(message.total.high)))
                                    return "total: integer|Long expected";
                            return null;
                        };

                        /**
                         * Creates a DmSegConfig message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DmSegConfig} DmSegConfig
                         */
                        DmSegConfig.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DmSegConfig)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DmSegConfig();
                            if (object.pageSize != null)
                                if ($util.Long)
                                    (message.pageSize = $util.Long.fromValue(object.pageSize)).unsigned = false;
                                else if (typeof object.pageSize === "string")
                                    message.pageSize = parseInt(object.pageSize, 10);
                                else if (typeof object.pageSize === "number")
                                    message.pageSize = object.pageSize;
                                else if (typeof object.pageSize === "object")
                                    message.pageSize = new $util.LongBits(object.pageSize.low >>> 0, object.pageSize.high >>> 0).toNumber();
                            if (object.total != null)
                                if ($util.Long)
                                    (message.total = $util.Long.fromValue(object.total)).unsigned = false;
                                else if (typeof object.total === "string")
                                    message.total = parseInt(object.total, 10);
                                else if (typeof object.total === "number")
                                    message.total = object.total;
                                else if (typeof object.total === "object")
                                    message.total = new $util.LongBits(object.total.low >>> 0, object.total.high >>> 0).toNumber();
                            return message;
                        };

                        /**
                         * Creates a plain object from a DmSegConfig message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.DmSegConfig} message DmSegConfig
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DmSegConfig.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.pageSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.pageSize = options.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.total = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.total = options.longs === String ? "0" : 0;
                            }
                            if (message.pageSize != null && message.hasOwnProperty("pageSize"))
                                if (typeof message.pageSize === "number")
                                    object.pageSize = options.longs === String ? String(message.pageSize) : message.pageSize;
                                else
                                    object.pageSize = options.longs === String ? $util.Long.prototype.toString.call(message.pageSize) : options.longs === Number ? new $util.LongBits(message.pageSize.low >>> 0, message.pageSize.high >>> 0).toNumber() : message.pageSize;
                            if (message.total != null && message.hasOwnProperty("total"))
                                if (typeof message.total === "number")
                                    object.total = options.longs === String ? String(message.total) : message.total;
                                else
                                    object.total = options.longs === String ? $util.Long.prototype.toString.call(message.total) : options.longs === Number ? new $util.LongBits(message.total.low >>> 0, message.total.high >>> 0).toNumber() : message.total;
                            return object;
                        };

                        /**
                         * Converts this DmSegConfig to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DmSegConfig.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DmSegConfig
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DmSegConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmSegConfig";
                        };

                        return DmSegConfig;
                    })();

                    v1.DanmakuFlagConfig = (function() {

                        /**
                         * Properties of a DanmakuFlagConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDanmakuFlagConfig
                         * @property {number|null} [recFlag] DanmakuFlagConfig recFlag
                         * @property {string|null} [recText] DanmakuFlagConfig recText
                         * @property {number|null} [recSwitch] DanmakuFlagConfig recSwitch
                         */

                        /**
                         * Constructs a new DanmakuFlagConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DanmakuFlagConfig.
                         * @implements IDanmakuFlagConfig
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDanmakuFlagConfig=} [properties] Properties to set
                         */
                        function DanmakuFlagConfig(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DanmakuFlagConfig recFlag.
                         * @member {number} recFlag
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @instance
                         */
                        DanmakuFlagConfig.prototype.recFlag = 0;

                        /**
                         * DanmakuFlagConfig recText.
                         * @member {string} recText
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @instance
                         */
                        DanmakuFlagConfig.prototype.recText = "";

                        /**
                         * DanmakuFlagConfig recSwitch.
                         * @member {number} recSwitch
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @instance
                         */
                        DanmakuFlagConfig.prototype.recSwitch = 0;

                        /**
                         * Creates a new DanmakuFlagConfig instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuFlagConfig=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DanmakuFlagConfig} DanmakuFlagConfig instance
                         */
                        DanmakuFlagConfig.create = function create(properties) {
                            return new DanmakuFlagConfig(properties);
                        };

                        /**
                         * Encodes the specified DanmakuFlagConfig message. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuFlagConfig.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuFlagConfig} message DanmakuFlagConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmakuFlagConfig.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.recFlag != null && Object.hasOwnProperty.call(message, "recFlag"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.recFlag);
                            if (message.recText != null && Object.hasOwnProperty.call(message, "recText"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.recText);
                            if (message.recSwitch != null && Object.hasOwnProperty.call(message, "recSwitch"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.recSwitch);
                            return writer;
                        };

                        /**
                         * Encodes the specified DanmakuFlagConfig message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuFlagConfig.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuFlagConfig} message DanmakuFlagConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmakuFlagConfig.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DanmakuFlagConfig message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DanmakuFlagConfig} DanmakuFlagConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a DanmakuFlagConfig message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DanmakuFlagConfig} DanmakuFlagConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DanmakuFlagConfig.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DanmakuFlagConfig message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DanmakuFlagConfig.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.recFlag != null && message.hasOwnProperty("recFlag"))
                                if (!$util.isInteger(message.recFlag))
                                    return "recFlag: integer expected";
                            if (message.recText != null && message.hasOwnProperty("recText"))
                                if (!$util.isString(message.recText))
                                    return "recText: string expected";
                            if (message.recSwitch != null && message.hasOwnProperty("recSwitch"))
                                if (!$util.isInteger(message.recSwitch))
                                    return "recSwitch: integer expected";
                            return null;
                        };

                        /**
                         * Creates a DanmakuFlagConfig message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DanmakuFlagConfig} DanmakuFlagConfig
                         */
                        DanmakuFlagConfig.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DanmakuFlagConfig)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DanmakuFlagConfig();
                            if (object.recFlag != null)
                                message.recFlag = object.recFlag | 0;
                            if (object.recText != null)
                                message.recText = String(object.recText);
                            if (object.recSwitch != null)
                                message.recSwitch = object.recSwitch | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from a DanmakuFlagConfig message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.DanmakuFlagConfig} message DanmakuFlagConfig
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DanmakuFlagConfig.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.recFlag = 0;
                                object.recText = "";
                                object.recSwitch = 0;
                            }
                            if (message.recFlag != null && message.hasOwnProperty("recFlag"))
                                object.recFlag = message.recFlag;
                            if (message.recText != null && message.hasOwnProperty("recText"))
                                object.recText = message.recText;
                            if (message.recSwitch != null && message.hasOwnProperty("recSwitch"))
                                object.recSwitch = message.recSwitch;
                            return object;
                        };

                        /**
                         * Converts this DanmakuFlagConfig to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DanmakuFlagConfig.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DanmakuFlagConfig
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DanmakuFlagConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmakuFlagConfig";
                        };

                        return DanmakuFlagConfig;
                    })();

                    v1.DmSegMobileReply = (function() {

                        /**
                         * Properties of a DmSegMobileReply.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmSegMobileReply
                         * @property {Array.<bilibili.community.service.dm.v1.IDanmakuElem>|null} [elems] DmSegMobileReply elems
                         * @property {Array.<bilibili.community.service.dm.v1.IDmColorful>|null} [colorfulSrc] DmSegMobileReply colorfulSrc
                         */

                        /**
                         * Constructs a new DmSegMobileReply.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmSegMobileReply.
                         * @implements IDmSegMobileReply
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmSegMobileReply=} [properties] Properties to set
                         */
                        function DmSegMobileReply(properties) {
                            this.elems = [];
                            this.colorfulSrc = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DmSegMobileReply elems.
                         * @member {Array.<bilibili.community.service.dm.v1.IDanmakuElem>} elems
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @instance
                         */
                        DmSegMobileReply.prototype.elems = $util.emptyArray;

                        /**
                         * DmSegMobileReply colorfulSrc.
                         * @member {Array.<bilibili.community.service.dm.v1.IDmColorful>} colorfulSrc
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @instance
                         */
                        DmSegMobileReply.prototype.colorfulSrc = $util.emptyArray;

                        /**
                         * Creates a new DmSegMobileReply instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegMobileReply=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DmSegMobileReply} DmSegMobileReply instance
                         */
                        DmSegMobileReply.create = function create(properties) {
                            return new DmSegMobileReply(properties);
                        };

                        /**
                         * Encodes the specified DmSegMobileReply message. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegMobileReply.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegMobileReply} message DmSegMobileReply message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSegMobileReply.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.elems != null && message.elems.length)
                                for (let i = 0; i < message.elems.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DanmakuElem.encode(message.elems[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.colorfulSrc != null && message.colorfulSrc.length)
                                for (let i = 0; i < message.colorfulSrc.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DmColorful.encode(message.colorfulSrc[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified DmSegMobileReply message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegMobileReply.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegMobileReply} message DmSegMobileReply message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSegMobileReply.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DmSegMobileReply message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmSegMobileReply} DmSegMobileReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a DmSegMobileReply message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DmSegMobileReply} DmSegMobileReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmSegMobileReply.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DmSegMobileReply message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DmSegMobileReply.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.elems != null && message.hasOwnProperty("elems")) {
                                if (!Array.isArray(message.elems))
                                    return "elems: array expected";
                                for (let i = 0; i < message.elems.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.DanmakuElem.verify(message.elems[i]);
                                    if (error)
                                        return "elems." + error;
                                }
                            }
                            if (message.colorfulSrc != null && message.hasOwnProperty("colorfulSrc")) {
                                if (!Array.isArray(message.colorfulSrc))
                                    return "colorfulSrc: array expected";
                                for (let i = 0; i < message.colorfulSrc.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.DmColorful.verify(message.colorfulSrc[i]);
                                    if (error)
                                        return "colorfulSrc." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a DmSegMobileReply message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DmSegMobileReply} DmSegMobileReply
                         */
                        DmSegMobileReply.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DmSegMobileReply)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DmSegMobileReply();
                            if (object.elems) {
                                if (!Array.isArray(object.elems))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.elems: array expected");
                                message.elems = [];
                                for (let i = 0; i < object.elems.length; ++i) {
                                    if (typeof object.elems[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.elems: object expected");
                                    message.elems[i] = $root.bilibili.community.service.dm.v1.DanmakuElem.fromObject(object.elems[i]);
                                }
                            }
                            if (object.colorfulSrc) {
                                if (!Array.isArray(object.colorfulSrc))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.colorfulSrc: array expected");
                                message.colorfulSrc = [];
                                for (let i = 0; i < object.colorfulSrc.length; ++i) {
                                    if (typeof object.colorfulSrc[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.colorfulSrc: object expected");
                                    message.colorfulSrc[i] = $root.bilibili.community.service.dm.v1.DmColorful.fromObject(object.colorfulSrc[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a DmSegMobileReply message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.DmSegMobileReply} message DmSegMobileReply
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DmSegMobileReply.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults) {
                                object.elems = [];
                                object.colorfulSrc = [];
                            }
                            if (message.elems && message.elems.length) {
                                object.elems = [];
                                for (let j = 0; j < message.elems.length; ++j)
                                    object.elems[j] = $root.bilibili.community.service.dm.v1.DanmakuElem.toObject(message.elems[j], options);
                            }
                            if (message.colorfulSrc && message.colorfulSrc.length) {
                                object.colorfulSrc = [];
                                for (let j = 0; j < message.colorfulSrc.length; ++j)
                                    object.colorfulSrc[j] = $root.bilibili.community.service.dm.v1.DmColorful.toObject(message.colorfulSrc[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this DmSegMobileReply to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DmSegMobileReply.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DmSegMobileReply
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DmSegMobileReply.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmSegMobileReply";
                        };

                        return DmSegMobileReply;
                    })();

                    v1.DanmakuElem = (function() {

                        /**
                         * Properties of a DanmakuElem.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDanmakuElem
                         * @property {number|null} [stime] DanmakuElem stime
                         * @property {number|null} [mode] DanmakuElem mode
                         * @property {number|null} [size] DanmakuElem size
                         * @property {number|null} [color] DanmakuElem color
                         * @property {string|null} [uhash] DanmakuElem uhash
                         * @property {string|null} [text] DanmakuElem text
                         * @property {number|Long|null} [date] DanmakuElem date
                         * @property {number|null} [weight] DanmakuElem weight
                         * @property {string|null} [action] DanmakuElem action
                         * @property {number|null} [pool] DanmakuElem pool
                         * @property {string|null} [dmid] DanmakuElem dmid
                         * @property {number|null} [attr] DanmakuElem attr
                         * @property {string|null} [animation] DanmakuElem animation
                         * @property {bilibili.community.service.dm.v1.DmColorfulType|null} [colorful] DanmakuElem colorful
                         * @property {number|Long|null} [oid] DanmakuElem oid
                         */

                        /**
                         * Constructs a new DanmakuElem.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DanmakuElem.
                         * @implements IDanmakuElem
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDanmakuElem=} [properties] Properties to set
                         */
                        function DanmakuElem(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DanmakuElem stime.
                         * @member {number} stime
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.stime = 0;

                        /**
                         * DanmakuElem mode.
                         * @member {number} mode
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.mode = 0;

                        /**
                         * DanmakuElem size.
                         * @member {number} size
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.size = 0;

                        /**
                         * DanmakuElem color.
                         * @member {number} color
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.color = 0;

                        /**
                         * DanmakuElem uhash.
                         * @member {string} uhash
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.uhash = "";

                        /**
                         * DanmakuElem text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.text = "";

                        /**
                         * DanmakuElem date.
                         * @member {number|Long} date
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.date = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DanmakuElem weight.
                         * @member {number} weight
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.weight = 0;

                        /**
                         * DanmakuElem action.
                         * @member {string} action
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.action = "";

                        /**
                         * DanmakuElem pool.
                         * @member {number} pool
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.pool = 0;

                        /**
                         * DanmakuElem dmid.
                         * @member {string} dmid
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.dmid = "";

                        /**
                         * DanmakuElem attr.
                         * @member {number} attr
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.attr = 0;

                        /**
                         * DanmakuElem animation.
                         * @member {string} animation
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.animation = "";

                        /**
                         * DanmakuElem colorful.
                         * @member {bilibili.community.service.dm.v1.DmColorfulType} colorful
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.colorful = 0;

                        /**
                         * DanmakuElem oid.
                         * @member {number|Long} oid
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * Creates a new DanmakuElem instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuElem=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DanmakuElem} DanmakuElem instance
                         */
                        DanmakuElem.create = function create(properties) {
                            return new DanmakuElem(properties);
                        };

                        /**
                         * Encodes the specified DanmakuElem message. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuElem.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuElem} message DanmakuElem message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmakuElem.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.stime != null && Object.hasOwnProperty.call(message, "stime"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.stime);
                            if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.mode);
                            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.size);
                            if (message.color != null && Object.hasOwnProperty.call(message, "color"))
                                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.color);
                            if (message.uhash != null && Object.hasOwnProperty.call(message, "uhash"))
                                writer.uint32(/* id 6, wireType 2 =*/50).string(message.uhash);
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 7, wireType 2 =*/58).string(message.text);
                            if (message.date != null && Object.hasOwnProperty.call(message, "date"))
                                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.date);
                            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.weight);
                            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                                writer.uint32(/* id 10, wireType 2 =*/82).string(message.action);
                            if (message.pool != null && Object.hasOwnProperty.call(message, "pool"))
                                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.pool);
                            if (message.dmid != null && Object.hasOwnProperty.call(message, "dmid"))
                                writer.uint32(/* id 12, wireType 2 =*/98).string(message.dmid);
                            if (message.attr != null && Object.hasOwnProperty.call(message, "attr"))
                                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.attr);
                            if (message.animation != null && Object.hasOwnProperty.call(message, "animation"))
                                writer.uint32(/* id 22, wireType 2 =*/178).string(message.animation);
                            if (message.colorful != null && Object.hasOwnProperty.call(message, "colorful"))
                                writer.uint32(/* id 24, wireType 0 =*/192).int32(message.colorful);
                            if (message.oid != null && Object.hasOwnProperty.call(message, "oid"))
                                writer.uint32(/* id 26, wireType 0 =*/208).int64(message.oid);
                            return writer;
                        };

                        /**
                         * Encodes the specified DanmakuElem message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuElem.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuElem} message DanmakuElem message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmakuElem.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DanmakuElem message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DanmakuElem} DanmakuElem
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a DanmakuElem message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DanmakuElem} DanmakuElem
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DanmakuElem.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DanmakuElem message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DanmakuElem.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.stime != null && message.hasOwnProperty("stime"))
                                if (!$util.isInteger(message.stime))
                                    return "stime: integer expected";
                            if (message.mode != null && message.hasOwnProperty("mode"))
                                if (!$util.isInteger(message.mode))
                                    return "mode: integer expected";
                            if (message.size != null && message.hasOwnProperty("size"))
                                if (!$util.isInteger(message.size))
                                    return "size: integer expected";
                            if (message.color != null && message.hasOwnProperty("color"))
                                if (!$util.isInteger(message.color))
                                    return "color: integer expected";
                            if (message.uhash != null && message.hasOwnProperty("uhash"))
                                if (!$util.isString(message.uhash))
                                    return "uhash: string expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.date != null && message.hasOwnProperty("date"))
                                if (!$util.isInteger(message.date) && !(message.date && $util.isInteger(message.date.low) && $util.isInteger(message.date.high)))
                                    return "date: integer|Long expected";
                            if (message.weight != null && message.hasOwnProperty("weight"))
                                if (!$util.isInteger(message.weight))
                                    return "weight: integer expected";
                            if (message.action != null && message.hasOwnProperty("action"))
                                if (!$util.isString(message.action))
                                    return "action: string expected";
                            if (message.pool != null && message.hasOwnProperty("pool"))
                                if (!$util.isInteger(message.pool))
                                    return "pool: integer expected";
                            if (message.dmid != null && message.hasOwnProperty("dmid"))
                                if (!$util.isString(message.dmid))
                                    return "dmid: string expected";
                            if (message.attr != null && message.hasOwnProperty("attr"))
                                if (!$util.isInteger(message.attr))
                                    return "attr: integer expected";
                            if (message.animation != null && message.hasOwnProperty("animation"))
                                if (!$util.isString(message.animation))
                                    return "animation: string expected";
                            if (message.colorful != null && message.hasOwnProperty("colorful"))
                                switch (message.colorful) {
                                default:
                                    return "colorful: enum value expected";
                                case 0:
                                case 60001:
                                    break;
                                }
                            if (message.oid != null && message.hasOwnProperty("oid"))
                                if (!$util.isInteger(message.oid) && !(message.oid && $util.isInteger(message.oid.low) && $util.isInteger(message.oid.high)))
                                    return "oid: integer|Long expected";
                            return null;
                        };

                        /**
                         * Creates a DanmakuElem message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DanmakuElem} DanmakuElem
                         */
                        DanmakuElem.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DanmakuElem)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DanmakuElem();
                            if (object.stime != null)
                                message.stime = object.stime | 0;
                            if (object.mode != null)
                                message.mode = object.mode | 0;
                            if (object.size != null)
                                message.size = object.size | 0;
                            if (object.color != null)
                                message.color = object.color >>> 0;
                            if (object.uhash != null)
                                message.uhash = String(object.uhash);
                            if (object.text != null)
                                message.text = String(object.text);
                            if (object.date != null)
                                if ($util.Long)
                                    (message.date = $util.Long.fromValue(object.date)).unsigned = false;
                                else if (typeof object.date === "string")
                                    message.date = parseInt(object.date, 10);
                                else if (typeof object.date === "number")
                                    message.date = object.date;
                                else if (typeof object.date === "object")
                                    message.date = new $util.LongBits(object.date.low >>> 0, object.date.high >>> 0).toNumber();
                            if (object.weight != null)
                                message.weight = object.weight | 0;
                            if (object.action != null)
                                message.action = String(object.action);
                            if (object.pool != null)
                                message.pool = object.pool | 0;
                            if (object.dmid != null)
                                message.dmid = String(object.dmid);
                            if (object.attr != null)
                                message.attr = object.attr | 0;
                            if (object.animation != null)
                                message.animation = String(object.animation);
                            switch (object.colorful) {
                            default:
                                if (typeof object.colorful === "number") {
                                    message.colorful = object.colorful;
                                    break;
                                }
                                break;
                            case "NoneType":
                            case 0:
                                message.colorful = 0;
                                break;
                            case "VipGradualColor":
                            case 60001:
                                message.colorful = 60001;
                                break;
                            }
                            if (object.oid != null)
                                if ($util.Long)
                                    (message.oid = $util.Long.fromValue(object.oid)).unsigned = false;
                                else if (typeof object.oid === "string")
                                    message.oid = parseInt(object.oid, 10);
                                else if (typeof object.oid === "number")
                                    message.oid = object.oid;
                                else if (typeof object.oid === "object")
                                    message.oid = new $util.LongBits(object.oid.low >>> 0, object.oid.high >>> 0).toNumber();
                            return message;
                        };

                        /**
                         * Creates a plain object from a DanmakuElem message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {bilibili.community.service.dm.v1.DanmakuElem} message DanmakuElem
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DanmakuElem.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.stime = 0;
                                object.mode = 0;
                                object.size = 0;
                                object.color = 0;
                                object.uhash = "";
                                object.text = "";
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.date = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.date = options.longs === String ? "0" : 0;
                                object.weight = 0;
                                object.action = "";
                                object.pool = 0;
                                object.dmid = "";
                                object.attr = 0;
                                object.animation = "";
                                object.colorful = options.enums === String ? "NoneType" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.oid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.oid = options.longs === String ? "0" : 0;
                            }
                            if (message.stime != null && message.hasOwnProperty("stime"))
                                object.stime = message.stime;
                            if (message.mode != null && message.hasOwnProperty("mode"))
                                object.mode = message.mode;
                            if (message.size != null && message.hasOwnProperty("size"))
                                object.size = message.size;
                            if (message.color != null && message.hasOwnProperty("color"))
                                object.color = message.color;
                            if (message.uhash != null && message.hasOwnProperty("uhash"))
                                object.uhash = message.uhash;
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.date != null && message.hasOwnProperty("date"))
                                if (typeof message.date === "number")
                                    object.date = options.longs === String ? String(message.date) : message.date;
                                else
                                    object.date = options.longs === String ? $util.Long.prototype.toString.call(message.date) : options.longs === Number ? new $util.LongBits(message.date.low >>> 0, message.date.high >>> 0).toNumber() : message.date;
                            if (message.weight != null && message.hasOwnProperty("weight"))
                                object.weight = message.weight;
                            if (message.action != null && message.hasOwnProperty("action"))
                                object.action = message.action;
                            if (message.pool != null && message.hasOwnProperty("pool"))
                                object.pool = message.pool;
                            if (message.dmid != null && message.hasOwnProperty("dmid"))
                                object.dmid = message.dmid;
                            if (message.attr != null && message.hasOwnProperty("attr"))
                                object.attr = message.attr;
                            if (message.animation != null && message.hasOwnProperty("animation"))
                                object.animation = message.animation;
                            if (message.colorful != null && message.hasOwnProperty("colorful"))
                                object.colorful = options.enums === String ? $root.bilibili.community.service.dm.v1.DmColorfulType[message.colorful] === undefined ? message.colorful : $root.bilibili.community.service.dm.v1.DmColorfulType[message.colorful] : message.colorful;
                            if (message.oid != null && message.hasOwnProperty("oid"))
                                if (typeof message.oid === "number")
                                    object.oid = options.longs === String ? String(message.oid) : message.oid;
                                else
                                    object.oid = options.longs === String ? $util.Long.prototype.toString.call(message.oid) : options.longs === Number ? new $util.LongBits(message.oid.low >>> 0, message.oid.high >>> 0).toNumber() : message.oid;
                            return object;
                        };

                        /**
                         * Converts this DanmakuElem to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DanmakuElem.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DanmakuElem
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DanmakuElem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmakuElem";
                        };

                        return DanmakuElem;
                    })();

                    v1.DanmuWebPlayerConfig = (function() {

                        /**
                         * Properties of a DanmuWebPlayerConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDanmuWebPlayerConfig
                         * @property {boolean|null} [dmSwitch] DanmuWebPlayerConfig dmSwitch
                         * @property {boolean|null} [aiSwitch] DanmuWebPlayerConfig aiSwitch
                         * @property {number|null} [aiLevel] DanmuWebPlayerConfig aiLevel
                         * @property {boolean|null} [typeTop] DanmuWebPlayerConfig typeTop
                         * @property {boolean|null} [typeScroll] DanmuWebPlayerConfig typeScroll
                         * @property {boolean|null} [typeBottom] DanmuWebPlayerConfig typeBottom
                         * @property {boolean|null} [typeColor] DanmuWebPlayerConfig typeColor
                         * @property {boolean|null} [typeSpecial] DanmuWebPlayerConfig typeSpecial
                         * @property {boolean|null} [preventshade] DanmuWebPlayerConfig preventshade
                         * @property {boolean|null} [dmask] DanmuWebPlayerConfig dmask
                         * @property {number|null} [opacity] DanmuWebPlayerConfig opacity
                         * @property {number|null} [dmarea] DanmuWebPlayerConfig dmarea
                         * @property {number|null} [speedplus] DanmuWebPlayerConfig speedplus
                         * @property {number|null} [fontsize] DanmuWebPlayerConfig fontsize
                         * @property {boolean|null} [fullscreensync] DanmuWebPlayerConfig fullscreensync
                         * @property {boolean|null} [speedsync] DanmuWebPlayerConfig speedsync
                         * @property {string|null} [fontfamily] DanmuWebPlayerConfig fontfamily
                         * @property {boolean|null} [bold] DanmuWebPlayerConfig bold
                         * @property {number|null} [fontborder] DanmuWebPlayerConfig fontborder
                         * @property {number|null} [seniorModeSwitch] DanmuWebPlayerConfig seniorModeSwitch
                         */

                        /**
                         * Constructs a new DanmuWebPlayerConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DanmuWebPlayerConfig.
                         * @implements IDanmuWebPlayerConfig
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig=} [properties] Properties to set
                         */
                        function DanmuWebPlayerConfig(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DanmuWebPlayerConfig dmSwitch.
                         * @member {boolean} dmSwitch
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.dmSwitch = false;

                        /**
                         * DanmuWebPlayerConfig aiSwitch.
                         * @member {boolean} aiSwitch
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.aiSwitch = false;

                        /**
                         * DanmuWebPlayerConfig aiLevel.
                         * @member {number} aiLevel
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.aiLevel = 0;

                        /**
                         * DanmuWebPlayerConfig typeTop.
                         * @member {boolean} typeTop
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.typeTop = false;

                        /**
                         * DanmuWebPlayerConfig typeScroll.
                         * @member {boolean} typeScroll
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.typeScroll = false;

                        /**
                         * DanmuWebPlayerConfig typeBottom.
                         * @member {boolean} typeBottom
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.typeBottom = false;

                        /**
                         * DanmuWebPlayerConfig typeColor.
                         * @member {boolean} typeColor
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.typeColor = false;

                        /**
                         * DanmuWebPlayerConfig typeSpecial.
                         * @member {boolean} typeSpecial
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.typeSpecial = false;

                        /**
                         * DanmuWebPlayerConfig preventshade.
                         * @member {boolean} preventshade
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.preventshade = false;

                        /**
                         * DanmuWebPlayerConfig dmask.
                         * @member {boolean} dmask
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.dmask = false;

                        /**
                         * DanmuWebPlayerConfig opacity.
                         * @member {number} opacity
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.opacity = 0;

                        /**
                         * DanmuWebPlayerConfig dmarea.
                         * @member {number} dmarea
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.dmarea = 0;

                        /**
                         * DanmuWebPlayerConfig speedplus.
                         * @member {number} speedplus
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.speedplus = 0;

                        /**
                         * DanmuWebPlayerConfig fontsize.
                         * @member {number} fontsize
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.fontsize = 0;

                        /**
                         * DanmuWebPlayerConfig fullscreensync.
                         * @member {boolean} fullscreensync
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.fullscreensync = false;

                        /**
                         * DanmuWebPlayerConfig speedsync.
                         * @member {boolean} speedsync
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.speedsync = false;

                        /**
                         * DanmuWebPlayerConfig fontfamily.
                         * @member {string} fontfamily
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.fontfamily = "";

                        /**
                         * DanmuWebPlayerConfig bold.
                         * @member {boolean} bold
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.bold = false;

                        /**
                         * DanmuWebPlayerConfig fontborder.
                         * @member {number} fontborder
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.fontborder = 0;

                        /**
                         * DanmuWebPlayerConfig seniorModeSwitch.
                         * @member {number} seniorModeSwitch
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.seniorModeSwitch = 0;

                        /**
                         * Creates a new DanmuWebPlayerConfig instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} DanmuWebPlayerConfig instance
                         */
                        DanmuWebPlayerConfig.create = function create(properties) {
                            return new DanmuWebPlayerConfig(properties);
                        };

                        /**
                         * Encodes the specified DanmuWebPlayerConfig message. Does not implicitly {@link bilibili.community.service.dm.v1.DanmuWebPlayerConfig.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig} message DanmuWebPlayerConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmuWebPlayerConfig.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.dmSwitch != null && Object.hasOwnProperty.call(message, "dmSwitch"))
                                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.dmSwitch);
                            if (message.aiSwitch != null && Object.hasOwnProperty.call(message, "aiSwitch"))
                                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.aiSwitch);
                            if (message.aiLevel != null && Object.hasOwnProperty.call(message, "aiLevel"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.aiLevel);
                            if (message.typeTop != null && Object.hasOwnProperty.call(message, "typeTop"))
                                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.typeTop);
                            if (message.typeScroll != null && Object.hasOwnProperty.call(message, "typeScroll"))
                                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.typeScroll);
                            if (message.typeBottom != null && Object.hasOwnProperty.call(message, "typeBottom"))
                                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.typeBottom);
                            if (message.typeColor != null && Object.hasOwnProperty.call(message, "typeColor"))
                                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.typeColor);
                            if (message.typeSpecial != null && Object.hasOwnProperty.call(message, "typeSpecial"))
                                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.typeSpecial);
                            if (message.preventshade != null && Object.hasOwnProperty.call(message, "preventshade"))
                                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.preventshade);
                            if (message.dmask != null && Object.hasOwnProperty.call(message, "dmask"))
                                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.dmask);
                            if (message.opacity != null && Object.hasOwnProperty.call(message, "opacity"))
                                writer.uint32(/* id 11, wireType 5 =*/93).float(message.opacity);
                            if (message.dmarea != null && Object.hasOwnProperty.call(message, "dmarea"))
                                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.dmarea);
                            if (message.speedplus != null && Object.hasOwnProperty.call(message, "speedplus"))
                                writer.uint32(/* id 13, wireType 5 =*/109).float(message.speedplus);
                            if (message.fontsize != null && Object.hasOwnProperty.call(message, "fontsize"))
                                writer.uint32(/* id 14, wireType 5 =*/117).float(message.fontsize);
                            if (message.fullscreensync != null && Object.hasOwnProperty.call(message, "fullscreensync"))
                                writer.uint32(/* id 15, wireType 0 =*/120).bool(message.fullscreensync);
                            if (message.speedsync != null && Object.hasOwnProperty.call(message, "speedsync"))
                                writer.uint32(/* id 16, wireType 0 =*/128).bool(message.speedsync);
                            if (message.fontfamily != null && Object.hasOwnProperty.call(message, "fontfamily"))
                                writer.uint32(/* id 17, wireType 2 =*/138).string(message.fontfamily);
                            if (message.bold != null && Object.hasOwnProperty.call(message, "bold"))
                                writer.uint32(/* id 18, wireType 0 =*/144).bool(message.bold);
                            if (message.fontborder != null && Object.hasOwnProperty.call(message, "fontborder"))
                                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.fontborder);
                            if (message.seniorModeSwitch != null && Object.hasOwnProperty.call(message, "seniorModeSwitch"))
                                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.seniorModeSwitch);
                            return writer;
                        };

                        /**
                         * Encodes the specified DanmuWebPlayerConfig message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DanmuWebPlayerConfig.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig} message DanmuWebPlayerConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmuWebPlayerConfig.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DanmuWebPlayerConfig message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} DanmuWebPlayerConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a DanmuWebPlayerConfig message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} DanmuWebPlayerConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DanmuWebPlayerConfig.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DanmuWebPlayerConfig message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DanmuWebPlayerConfig.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.dmSwitch != null && message.hasOwnProperty("dmSwitch"))
                                if (typeof message.dmSwitch !== "boolean")
                                    return "dmSwitch: boolean expected";
                            if (message.aiSwitch != null && message.hasOwnProperty("aiSwitch"))
                                if (typeof message.aiSwitch !== "boolean")
                                    return "aiSwitch: boolean expected";
                            if (message.aiLevel != null && message.hasOwnProperty("aiLevel"))
                                if (!$util.isInteger(message.aiLevel))
                                    return "aiLevel: integer expected";
                            if (message.typeTop != null && message.hasOwnProperty("typeTop"))
                                if (typeof message.typeTop !== "boolean")
                                    return "typeTop: boolean expected";
                            if (message.typeScroll != null && message.hasOwnProperty("typeScroll"))
                                if (typeof message.typeScroll !== "boolean")
                                    return "typeScroll: boolean expected";
                            if (message.typeBottom != null && message.hasOwnProperty("typeBottom"))
                                if (typeof message.typeBottom !== "boolean")
                                    return "typeBottom: boolean expected";
                            if (message.typeColor != null && message.hasOwnProperty("typeColor"))
                                if (typeof message.typeColor !== "boolean")
                                    return "typeColor: boolean expected";
                            if (message.typeSpecial != null && message.hasOwnProperty("typeSpecial"))
                                if (typeof message.typeSpecial !== "boolean")
                                    return "typeSpecial: boolean expected";
                            if (message.preventshade != null && message.hasOwnProperty("preventshade"))
                                if (typeof message.preventshade !== "boolean")
                                    return "preventshade: boolean expected";
                            if (message.dmask != null && message.hasOwnProperty("dmask"))
                                if (typeof message.dmask !== "boolean")
                                    return "dmask: boolean expected";
                            if (message.opacity != null && message.hasOwnProperty("opacity"))
                                if (typeof message.opacity !== "number")
                                    return "opacity: number expected";
                            if (message.dmarea != null && message.hasOwnProperty("dmarea"))
                                if (!$util.isInteger(message.dmarea))
                                    return "dmarea: integer expected";
                            if (message.speedplus != null && message.hasOwnProperty("speedplus"))
                                if (typeof message.speedplus !== "number")
                                    return "speedplus: number expected";
                            if (message.fontsize != null && message.hasOwnProperty("fontsize"))
                                if (typeof message.fontsize !== "number")
                                    return "fontsize: number expected";
                            if (message.fullscreensync != null && message.hasOwnProperty("fullscreensync"))
                                if (typeof message.fullscreensync !== "boolean")
                                    return "fullscreensync: boolean expected";
                            if (message.speedsync != null && message.hasOwnProperty("speedsync"))
                                if (typeof message.speedsync !== "boolean")
                                    return "speedsync: boolean expected";
                            if (message.fontfamily != null && message.hasOwnProperty("fontfamily"))
                                if (!$util.isString(message.fontfamily))
                                    return "fontfamily: string expected";
                            if (message.bold != null && message.hasOwnProperty("bold"))
                                if (typeof message.bold !== "boolean")
                                    return "bold: boolean expected";
                            if (message.fontborder != null && message.hasOwnProperty("fontborder"))
                                if (!$util.isInteger(message.fontborder))
                                    return "fontborder: integer expected";
                            if (message.seniorModeSwitch != null && message.hasOwnProperty("seniorModeSwitch"))
                                if (!$util.isInteger(message.seniorModeSwitch))
                                    return "seniorModeSwitch: integer expected";
                            return null;
                        };

                        /**
                         * Creates a DanmuWebPlayerConfig message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} DanmuWebPlayerConfig
                         */
                        DanmuWebPlayerConfig.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig();
                            if (object.dmSwitch != null)
                                message.dmSwitch = Boolean(object.dmSwitch);
                            if (object.aiSwitch != null)
                                message.aiSwitch = Boolean(object.aiSwitch);
                            if (object.aiLevel != null)
                                message.aiLevel = object.aiLevel | 0;
                            if (object.typeTop != null)
                                message.typeTop = Boolean(object.typeTop);
                            if (object.typeScroll != null)
                                message.typeScroll = Boolean(object.typeScroll);
                            if (object.typeBottom != null)
                                message.typeBottom = Boolean(object.typeBottom);
                            if (object.typeColor != null)
                                message.typeColor = Boolean(object.typeColor);
                            if (object.typeSpecial != null)
                                message.typeSpecial = Boolean(object.typeSpecial);
                            if (object.preventshade != null)
                                message.preventshade = Boolean(object.preventshade);
                            if (object.dmask != null)
                                message.dmask = Boolean(object.dmask);
                            if (object.opacity != null)
                                message.opacity = Number(object.opacity);
                            if (object.dmarea != null)
                                message.dmarea = object.dmarea | 0;
                            if (object.speedplus != null)
                                message.speedplus = Number(object.speedplus);
                            if (object.fontsize != null)
                                message.fontsize = Number(object.fontsize);
                            if (object.fullscreensync != null)
                                message.fullscreensync = Boolean(object.fullscreensync);
                            if (object.speedsync != null)
                                message.speedsync = Boolean(object.speedsync);
                            if (object.fontfamily != null)
                                message.fontfamily = String(object.fontfamily);
                            if (object.bold != null)
                                message.bold = Boolean(object.bold);
                            if (object.fontborder != null)
                                message.fontborder = object.fontborder | 0;
                            if (object.seniorModeSwitch != null)
                                message.seniorModeSwitch = object.seniorModeSwitch | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from a DanmuWebPlayerConfig message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} message DanmuWebPlayerConfig
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DanmuWebPlayerConfig.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.dmSwitch = false;
                                object.aiSwitch = false;
                                object.aiLevel = 0;
                                object.typeTop = false;
                                object.typeScroll = false;
                                object.typeBottom = false;
                                object.typeColor = false;
                                object.typeSpecial = false;
                                object.preventshade = false;
                                object.dmask = false;
                                object.opacity = 0;
                                object.dmarea = 0;
                                object.speedplus = 0;
                                object.fontsize = 0;
                                object.fullscreensync = false;
                                object.speedsync = false;
                                object.fontfamily = "";
                                object.bold = false;
                                object.fontborder = 0;
                                object.seniorModeSwitch = 0;
                            }
                            if (message.dmSwitch != null && message.hasOwnProperty("dmSwitch"))
                                object.dmSwitch = message.dmSwitch;
                            if (message.aiSwitch != null && message.hasOwnProperty("aiSwitch"))
                                object.aiSwitch = message.aiSwitch;
                            if (message.aiLevel != null && message.hasOwnProperty("aiLevel"))
                                object.aiLevel = message.aiLevel;
                            if (message.typeTop != null && message.hasOwnProperty("typeTop"))
                                object.typeTop = message.typeTop;
                            if (message.typeScroll != null && message.hasOwnProperty("typeScroll"))
                                object.typeScroll = message.typeScroll;
                            if (message.typeBottom != null && message.hasOwnProperty("typeBottom"))
                                object.typeBottom = message.typeBottom;
                            if (message.typeColor != null && message.hasOwnProperty("typeColor"))
                                object.typeColor = message.typeColor;
                            if (message.typeSpecial != null && message.hasOwnProperty("typeSpecial"))
                                object.typeSpecial = message.typeSpecial;
                            if (message.preventshade != null && message.hasOwnProperty("preventshade"))
                                object.preventshade = message.preventshade;
                            if (message.dmask != null && message.hasOwnProperty("dmask"))
                                object.dmask = message.dmask;
                            if (message.opacity != null && message.hasOwnProperty("opacity"))
                                object.opacity = options.json && !isFinite(message.opacity) ? String(message.opacity) : message.opacity;
                            if (message.dmarea != null && message.hasOwnProperty("dmarea"))
                                object.dmarea = message.dmarea;
                            if (message.speedplus != null && message.hasOwnProperty("speedplus"))
                                object.speedplus = options.json && !isFinite(message.speedplus) ? String(message.speedplus) : message.speedplus;
                            if (message.fontsize != null && message.hasOwnProperty("fontsize"))
                                object.fontsize = options.json && !isFinite(message.fontsize) ? String(message.fontsize) : message.fontsize;
                            if (message.fullscreensync != null && message.hasOwnProperty("fullscreensync"))
                                object.fullscreensync = message.fullscreensync;
                            if (message.speedsync != null && message.hasOwnProperty("speedsync"))
                                object.speedsync = message.speedsync;
                            if (message.fontfamily != null && message.hasOwnProperty("fontfamily"))
                                object.fontfamily = message.fontfamily;
                            if (message.bold != null && message.hasOwnProperty("bold"))
                                object.bold = message.bold;
                            if (message.fontborder != null && message.hasOwnProperty("fontborder"))
                                object.fontborder = message.fontborder;
                            if (message.seniorModeSwitch != null && message.hasOwnProperty("seniorModeSwitch"))
                                object.seniorModeSwitch = message.seniorModeSwitch;
                            return object;
                        };

                        /**
                         * Converts this DanmuWebPlayerConfig to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DanmuWebPlayerConfig.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DanmuWebPlayerConfig
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DanmuWebPlayerConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DanmuWebPlayerConfig";
                        };

                        return DanmuWebPlayerConfig;
                    })();

                    v1.Expressions = (function() {

                        /**
                         * Properties of an Expressions.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IExpressions
                         * @property {Array.<bilibili.community.service.dm.v1.IExpression>|null} [data] Expressions data
                         */

                        /**
                         * Constructs a new Expressions.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents an Expressions.
                         * @implements IExpressions
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IExpressions=} [properties] Properties to set
                         */
                        function Expressions(properties) {
                            this.data = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * Expressions data.
                         * @member {Array.<bilibili.community.service.dm.v1.IExpression>} data
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @instance
                         */
                        Expressions.prototype.data = $util.emptyArray;

                        /**
                         * Creates a new Expressions instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @static
                         * @param {bilibili.community.service.dm.v1.IExpressions=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.Expressions} Expressions instance
                         */
                        Expressions.create = function create(properties) {
                            return new Expressions(properties);
                        };

                        /**
                         * Encodes the specified Expressions message. Does not implicitly {@link bilibili.community.service.dm.v1.Expressions.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @static
                         * @param {bilibili.community.service.dm.v1.IExpressions} message Expressions message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Expressions.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.data != null && message.data.length)
                                for (let i = 0; i < message.data.length; ++i)
                                    $root.bilibili.community.service.dm.v1.Expression.encode(message.data[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified Expressions message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.Expressions.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @static
                         * @param {bilibili.community.service.dm.v1.IExpressions} message Expressions message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Expressions.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes an Expressions message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.Expressions} Expressions
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes an Expressions message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.Expressions} Expressions
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Expressions.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an Expressions message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Expressions.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.data != null && message.hasOwnProperty("data")) {
                                if (!Array.isArray(message.data))
                                    return "data: array expected";
                                for (let i = 0; i < message.data.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.Expression.verify(message.data[i]);
                                    if (error)
                                        return "data." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates an Expressions message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.Expressions} Expressions
                         */
                        Expressions.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.Expressions)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.Expressions();
                            if (object.data) {
                                if (!Array.isArray(object.data))
                                    throw TypeError(".bilibili.community.service.dm.v1.Expressions.data: array expected");
                                message.data = [];
                                for (let i = 0; i < object.data.length; ++i) {
                                    if (typeof object.data[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.Expressions.data: object expected");
                                    message.data[i] = $root.bilibili.community.service.dm.v1.Expression.fromObject(object.data[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from an Expressions message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @static
                         * @param {bilibili.community.service.dm.v1.Expressions} message Expressions
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        Expressions.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults)
                                object.data = [];
                            if (message.data && message.data.length) {
                                object.data = [];
                                for (let j = 0; j < message.data.length; ++j)
                                    object.data[j] = $root.bilibili.community.service.dm.v1.Expression.toObject(message.data[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this Expressions to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Expressions.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for Expressions
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.Expressions
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        Expressions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Expressions";
                        };

                        return Expressions;
                    })();

                    v1.Expression = (function() {

                        /**
                         * Properties of an Expression.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IExpression
                         * @property {Array.<string>|null} [keyword] Expression keyword
                         * @property {string|null} [url] Expression url
                         * @property {Array.<bilibili.community.service.dm.v1.IPeriod>|null} [period] Expression period
                         */

                        /**
                         * Constructs a new Expression.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents an Expression.
                         * @implements IExpression
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IExpression=} [properties] Properties to set
                         */
                        function Expression(properties) {
                            this.keyword = [];
                            this.period = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * Expression keyword.
                         * @member {Array.<string>} keyword
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @instance
                         */
                        Expression.prototype.keyword = $util.emptyArray;

                        /**
                         * Expression url.
                         * @member {string} url
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @instance
                         */
                        Expression.prototype.url = "";

                        /**
                         * Expression period.
                         * @member {Array.<bilibili.community.service.dm.v1.IPeriod>} period
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @instance
                         */
                        Expression.prototype.period = $util.emptyArray;

                        /**
                         * Creates a new Expression instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @static
                         * @param {bilibili.community.service.dm.v1.IExpression=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.Expression} Expression instance
                         */
                        Expression.create = function create(properties) {
                            return new Expression(properties);
                        };

                        /**
                         * Encodes the specified Expression message. Does not implicitly {@link bilibili.community.service.dm.v1.Expression.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @static
                         * @param {bilibili.community.service.dm.v1.IExpression} message Expression message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Expression.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.keyword != null && message.keyword.length)
                                for (let i = 0; i < message.keyword.length; ++i)
                                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.keyword[i]);
                            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.url);
                            if (message.period != null && message.period.length)
                                for (let i = 0; i < message.period.length; ++i)
                                    $root.bilibili.community.service.dm.v1.Period.encode(message.period[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified Expression message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.Expression.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @static
                         * @param {bilibili.community.service.dm.v1.IExpression} message Expression message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Expression.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes an Expression message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.Expression} Expression
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes an Expression message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.Expression} Expression
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Expression.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an Expression message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Expression.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.keyword != null && message.hasOwnProperty("keyword")) {
                                if (!Array.isArray(message.keyword))
                                    return "keyword: array expected";
                                for (let i = 0; i < message.keyword.length; ++i)
                                    if (!$util.isString(message.keyword[i]))
                                        return "keyword: string[] expected";
                            }
                            if (message.url != null && message.hasOwnProperty("url"))
                                if (!$util.isString(message.url))
                                    return "url: string expected";
                            if (message.period != null && message.hasOwnProperty("period")) {
                                if (!Array.isArray(message.period))
                                    return "period: array expected";
                                for (let i = 0; i < message.period.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.Period.verify(message.period[i]);
                                    if (error)
                                        return "period." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates an Expression message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.Expression} Expression
                         */
                        Expression.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.Expression)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.Expression();
                            if (object.keyword) {
                                if (!Array.isArray(object.keyword))
                                    throw TypeError(".bilibili.community.service.dm.v1.Expression.keyword: array expected");
                                message.keyword = [];
                                for (let i = 0; i < object.keyword.length; ++i)
                                    message.keyword[i] = String(object.keyword[i]);
                            }
                            if (object.url != null)
                                message.url = String(object.url);
                            if (object.period) {
                                if (!Array.isArray(object.period))
                                    throw TypeError(".bilibili.community.service.dm.v1.Expression.period: array expected");
                                message.period = [];
                                for (let i = 0; i < object.period.length; ++i) {
                                    if (typeof object.period[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.Expression.period: object expected");
                                    message.period[i] = $root.bilibili.community.service.dm.v1.Period.fromObject(object.period[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from an Expression message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @static
                         * @param {bilibili.community.service.dm.v1.Expression} message Expression
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        Expression.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults) {
                                object.keyword = [];
                                object.period = [];
                            }
                            if (options.defaults)
                                object.url = "";
                            if (message.keyword && message.keyword.length) {
                                object.keyword = [];
                                for (let j = 0; j < message.keyword.length; ++j)
                                    object.keyword[j] = message.keyword[j];
                            }
                            if (message.url != null && message.hasOwnProperty("url"))
                                object.url = message.url;
                            if (message.period && message.period.length) {
                                object.period = [];
                                for (let j = 0; j < message.period.length; ++j)
                                    object.period[j] = $root.bilibili.community.service.dm.v1.Period.toObject(message.period[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this Expression to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Expression.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for Expression
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.Expression
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        Expression.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Expression";
                        };

                        return Expression;
                    })();

                    v1.Period = (function() {

                        /**
                         * Properties of a Period.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IPeriod
                         * @property {number|Long|null} [start] Period start
                         * @property {number|Long|null} [end] Period end
                         */

                        /**
                         * Constructs a new Period.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a Period.
                         * @implements IPeriod
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IPeriod=} [properties] Properties to set
                         */
                        function Period(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * Period start.
                         * @member {number|Long} start
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @instance
                         */
                        Period.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * Period end.
                         * @member {number|Long} end
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @instance
                         */
                        Period.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * Creates a new Period instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @static
                         * @param {bilibili.community.service.dm.v1.IPeriod=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.Period} Period instance
                         */
                        Period.create = function create(properties) {
                            return new Period(properties);
                        };

                        /**
                         * Encodes the specified Period message. Does not implicitly {@link bilibili.community.service.dm.v1.Period.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @static
                         * @param {bilibili.community.service.dm.v1.IPeriod} message Period message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Period.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.start);
                            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.end);
                            return writer;
                        };

                        /**
                         * Encodes the specified Period message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.Period.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @static
                         * @param {bilibili.community.service.dm.v1.IPeriod} message Period message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Period.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a Period message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.Period} Period
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a Period message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.Period} Period
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Period.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a Period message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Period.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.start != null && message.hasOwnProperty("start"))
                                if (!$util.isInteger(message.start) && !(message.start && $util.isInteger(message.start.low) && $util.isInteger(message.start.high)))
                                    return "start: integer|Long expected";
                            if (message.end != null && message.hasOwnProperty("end"))
                                if (!$util.isInteger(message.end) && !(message.end && $util.isInteger(message.end.low) && $util.isInteger(message.end.high)))
                                    return "end: integer|Long expected";
                            return null;
                        };

                        /**
                         * Creates a Period message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.Period} Period
                         */
                        Period.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.Period)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.Period();
                            if (object.start != null)
                                if ($util.Long)
                                    (message.start = $util.Long.fromValue(object.start)).unsigned = false;
                                else if (typeof object.start === "string")
                                    message.start = parseInt(object.start, 10);
                                else if (typeof object.start === "number")
                                    message.start = object.start;
                                else if (typeof object.start === "object")
                                    message.start = new $util.LongBits(object.start.low >>> 0, object.start.high >>> 0).toNumber();
                            if (object.end != null)
                                if ($util.Long)
                                    (message.end = $util.Long.fromValue(object.end)).unsigned = false;
                                else if (typeof object.end === "string")
                                    message.end = parseInt(object.end, 10);
                                else if (typeof object.end === "number")
                                    message.end = object.end;
                                else if (typeof object.end === "object")
                                    message.end = new $util.LongBits(object.end.low >>> 0, object.end.high >>> 0).toNumber();
                            return message;
                        };

                        /**
                         * Creates a plain object from a Period message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @static
                         * @param {bilibili.community.service.dm.v1.Period} message Period
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        Period.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.start = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.start = options.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.end = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.end = options.longs === String ? "0" : 0;
                            }
                            if (message.start != null && message.hasOwnProperty("start"))
                                if (typeof message.start === "number")
                                    object.start = options.longs === String ? String(message.start) : message.start;
                                else
                                    object.start = options.longs === String ? $util.Long.prototype.toString.call(message.start) : options.longs === Number ? new $util.LongBits(message.start.low >>> 0, message.start.high >>> 0).toNumber() : message.start;
                            if (message.end != null && message.hasOwnProperty("end"))
                                if (typeof message.end === "number")
                                    object.end = options.longs === String ? String(message.end) : message.end;
                                else
                                    object.end = options.longs === String ? $util.Long.prototype.toString.call(message.end) : options.longs === Number ? new $util.LongBits(message.end.low >>> 0, message.end.high >>> 0).toNumber() : message.end;
                            return object;
                        };

                        /**
                         * Converts this Period to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Period.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for Period
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        Period.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.Period";
                        };

                        return Period;
                    })();

                    v1.AnyBody = (function() {

                        /**
                         * Properties of an AnyBody.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IAnyBody
                         * @property {google.protobuf.IAny|null} [body] AnyBody body
                         */

                        /**
                         * Constructs a new AnyBody.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents an AnyBody.
                         * @implements IAnyBody
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IAnyBody=} [properties] Properties to set
                         */
                        function AnyBody(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * AnyBody body.
                         * @member {google.protobuf.IAny|null|undefined} body
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @instance
                         */
                        AnyBody.prototype.body = null;

                        /**
                         * Creates a new AnyBody instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @static
                         * @param {bilibili.community.service.dm.v1.IAnyBody=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.AnyBody} AnyBody instance
                         */
                        AnyBody.create = function create(properties) {
                            return new AnyBody(properties);
                        };

                        /**
                         * Encodes the specified AnyBody message. Does not implicitly {@link bilibili.community.service.dm.v1.AnyBody.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @static
                         * @param {bilibili.community.service.dm.v1.IAnyBody} message AnyBody message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        AnyBody.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                                $root.google.protobuf.Any.encode(message.body, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified AnyBody message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.AnyBody.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @static
                         * @param {bilibili.community.service.dm.v1.IAnyBody} message AnyBody message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        AnyBody.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes an AnyBody message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.AnyBody} AnyBody
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes an AnyBody message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.AnyBody} AnyBody
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        AnyBody.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an AnyBody message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        AnyBody.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.body != null && message.hasOwnProperty("body")) {
                                let error = $root.google.protobuf.Any.verify(message.body);
                                if (error)
                                    return "body." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates an AnyBody message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.AnyBody} AnyBody
                         */
                        AnyBody.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.AnyBody)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.AnyBody();
                            if (object.body != null) {
                                if (typeof object.body !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.AnyBody.body: object expected");
                                message.body = $root.google.protobuf.Any.fromObject(object.body);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from an AnyBody message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @static
                         * @param {bilibili.community.service.dm.v1.AnyBody} message AnyBody
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        AnyBody.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults)
                                object.body = null;
                            if (message.body != null && message.hasOwnProperty("body"))
                                object.body = $root.google.protobuf.Any.toObject(message.body, options);
                            return object;
                        };

                        /**
                         * Converts this AnyBody to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        AnyBody.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for AnyBody
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.AnyBody
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        AnyBody.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.AnyBody";
                        };

                        return AnyBody;
                    })();

                    v1.DmColorful = (function() {

                        /**
                         * Properties of a DmColorful.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmColorful
                         * @property {bilibili.community.service.dm.v1.DmColorfulType|null} [type] DmColorful type
                         * @property {string|null} [src] DmColorful src
                         */

                        /**
                         * Constructs a new DmColorful.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmColorful.
                         * @implements IDmColorful
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmColorful=} [properties] Properties to set
                         */
                        function DmColorful(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DmColorful type.
                         * @member {bilibili.community.service.dm.v1.DmColorfulType} type
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @instance
                         */
                        DmColorful.prototype.type = 0;

                        /**
                         * DmColorful src.
                         * @member {string} src
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @instance
                         */
                        DmColorful.prototype.src = "";

                        /**
                         * Creates a new DmColorful instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmColorful=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DmColorful} DmColorful instance
                         */
                        DmColorful.create = function create(properties) {
                            return new DmColorful(properties);
                        };

                        /**
                         * Encodes the specified DmColorful message. Does not implicitly {@link bilibili.community.service.dm.v1.DmColorful.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmColorful} message DmColorful message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmColorful.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                            if (message.src != null && Object.hasOwnProperty.call(message, "src"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.src);
                            return writer;
                        };

                        /**
                         * Encodes the specified DmColorful message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DmColorful.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmColorful} message DmColorful message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmColorful.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DmColorful message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmColorful} DmColorful
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a DmColorful message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DmColorful} DmColorful
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmColorful.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DmColorful message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DmColorful.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.type != null && message.hasOwnProperty("type"))
                                switch (message.type) {
                                default:
                                    return "type: enum value expected";
                                case 0:
                                case 60001:
                                    break;
                                }
                            if (message.src != null && message.hasOwnProperty("src"))
                                if (!$util.isString(message.src))
                                    return "src: string expected";
                            return null;
                        };

                        /**
                         * Creates a DmColorful message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DmColorful} DmColorful
                         */
                        DmColorful.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DmColorful)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DmColorful();
                            switch (object.type) {
                            default:
                                if (typeof object.type === "number") {
                                    message.type = object.type;
                                    break;
                                }
                                break;
                            case "NoneType":
                            case 0:
                                message.type = 0;
                                break;
                            case "VipGradualColor":
                            case 60001:
                                message.type = 60001;
                                break;
                            }
                            if (object.src != null)
                                message.src = String(object.src);
                            return message;
                        };

                        /**
                         * Creates a plain object from a DmColorful message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @static
                         * @param {bilibili.community.service.dm.v1.DmColorful} message DmColorful
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DmColorful.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.type = options.enums === String ? "NoneType" : 0;
                                object.src = "";
                            }
                            if (message.type != null && message.hasOwnProperty("type"))
                                object.type = options.enums === String ? $root.bilibili.community.service.dm.v1.DmColorfulType[message.type] === undefined ? message.type : $root.bilibili.community.service.dm.v1.DmColorfulType[message.type] : message.type;
                            if (message.src != null && message.hasOwnProperty("src"))
                                object.src = message.src;
                            return object;
                        };

                        /**
                         * Converts this DmColorful to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DmColorful.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DmColorful
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DmColorful
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DmColorful.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmColorful";
                        };

                        return DmColorful;
                    })();

                    /**
                     * DmColorfulType enum.
                     * @name bilibili.community.service.dm.v1.DmColorfulType
                     * @enum {number}
                     * @property {number} NoneType=0 NoneType value
                     * @property {number} VipGradualColor=60001 VipGradualColor value
                     */
                    v1.DmColorfulType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "NoneType"] = 0;
                        values[valuesById[60001] = "VipGradualColor"] = 60001;
                        return values;
                    })();

                    v1.DmSubView = (function() {

                        /**
                         * Properties of a DmSubView.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmSubView
                         * @property {number|null} [type] DmSubView type
                         * @property {number|Long|null} [oid] DmSubView oid
                         * @property {number|Long|null} [pid] DmSubView pid
                         * @property {Array.<bilibili.community.service.dm.v1.IPostPanelV2>|null} [postPanel_2] DmSubView postPanel_2
                         */

                        /**
                         * Constructs a new DmSubView.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmSubView.
                         * @implements IDmSubView
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmSubView=} [properties] Properties to set
                         */
                        function DmSubView(properties) {
                            this.postPanel_2 = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DmSubView type.
                         * @member {number} type
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @instance
                         */
                        DmSubView.prototype.type = 0;

                        /**
                         * DmSubView oid.
                         * @member {number|Long} oid
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @instance
                         */
                        DmSubView.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DmSubView pid.
                         * @member {number|Long} pid
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @instance
                         */
                        DmSubView.prototype.pid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DmSubView postPanel_2.
                         * @member {Array.<bilibili.community.service.dm.v1.IPostPanelV2>} postPanel_2
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @instance
                         */
                        DmSubView.prototype.postPanel_2 = $util.emptyArray;

                        /**
                         * Creates a new DmSubView instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSubView=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DmSubView} DmSubView instance
                         */
                        DmSubView.create = function create(properties) {
                            return new DmSubView(properties);
                        };

                        /**
                         * Encodes the specified DmSubView message. Does not implicitly {@link bilibili.community.service.dm.v1.DmSubView.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSubView} message DmSubView message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSubView.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                            if (message.oid != null && Object.hasOwnProperty.call(message, "oid"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.oid);
                            if (message.pid != null && Object.hasOwnProperty.call(message, "pid"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.pid);
                            if (message.postPanel_2 != null && message.postPanel_2.length)
                                for (let i = 0; i < message.postPanel_2.length; ++i)
                                    $root.bilibili.community.service.dm.v1.PostPanelV2.encode(message.postPanel_2[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified DmSubView message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DmSubView.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSubView} message DmSubView message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSubView.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DmSubView message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmSubView} DmSubView
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
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

                        /**
                         * Decodes a DmSubView message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DmSubView} DmSubView
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmSubView.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DmSubView message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DmSubView.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.type != null && message.hasOwnProperty("type"))
                                if (!$util.isInteger(message.type))
                                    return "type: integer expected";
                            if (message.oid != null && message.hasOwnProperty("oid"))
                                if (!$util.isInteger(message.oid) && !(message.oid && $util.isInteger(message.oid.low) && $util.isInteger(message.oid.high)))
                                    return "oid: integer|Long expected";
                            if (message.pid != null && message.hasOwnProperty("pid"))
                                if (!$util.isInteger(message.pid) && !(message.pid && $util.isInteger(message.pid.low) && $util.isInteger(message.pid.high)))
                                    return "pid: integer|Long expected";
                            if (message.postPanel_2 != null && message.hasOwnProperty("postPanel_2")) {
                                if (!Array.isArray(message.postPanel_2))
                                    return "postPanel_2: array expected";
                                for (let i = 0; i < message.postPanel_2.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.PostPanelV2.verify(message.postPanel_2[i]);
                                    if (error)
                                        return "postPanel_2." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a DmSubView message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DmSubView} DmSubView
                         */
                        DmSubView.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DmSubView)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DmSubView();
                            if (object.type != null)
                                message.type = object.type | 0;
                            if (object.oid != null)
                                if ($util.Long)
                                    (message.oid = $util.Long.fromValue(object.oid)).unsigned = false;
                                else if (typeof object.oid === "string")
                                    message.oid = parseInt(object.oid, 10);
                                else if (typeof object.oid === "number")
                                    message.oid = object.oid;
                                else if (typeof object.oid === "object")
                                    message.oid = new $util.LongBits(object.oid.low >>> 0, object.oid.high >>> 0).toNumber();
                            if (object.pid != null)
                                if ($util.Long)
                                    (message.pid = $util.Long.fromValue(object.pid)).unsigned = false;
                                else if (typeof object.pid === "string")
                                    message.pid = parseInt(object.pid, 10);
                                else if (typeof object.pid === "number")
                                    message.pid = object.pid;
                                else if (typeof object.pid === "object")
                                    message.pid = new $util.LongBits(object.pid.low >>> 0, object.pid.high >>> 0).toNumber();
                            if (object.postPanel_2) {
                                if (!Array.isArray(object.postPanel_2))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmSubView.postPanel_2: array expected");
                                message.postPanel_2 = [];
                                for (let i = 0; i < object.postPanel_2.length; ++i) {
                                    if (typeof object.postPanel_2[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmSubView.postPanel_2: object expected");
                                    message.postPanel_2[i] = $root.bilibili.community.service.dm.v1.PostPanelV2.fromObject(object.postPanel_2[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a DmSubView message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @static
                         * @param {bilibili.community.service.dm.v1.DmSubView} message DmSubView
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DmSubView.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults)
                                object.postPanel_2 = [];
                            if (options.defaults) {
                                object.type = 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.oid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.oid = options.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.pid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.pid = options.longs === String ? "0" : 0;
                            }
                            if (message.type != null && message.hasOwnProperty("type"))
                                object.type = message.type;
                            if (message.oid != null && message.hasOwnProperty("oid"))
                                if (typeof message.oid === "number")
                                    object.oid = options.longs === String ? String(message.oid) : message.oid;
                                else
                                    object.oid = options.longs === String ? $util.Long.prototype.toString.call(message.oid) : options.longs === Number ? new $util.LongBits(message.oid.low >>> 0, message.oid.high >>> 0).toNumber() : message.oid;
                            if (message.pid != null && message.hasOwnProperty("pid"))
                                if (typeof message.pid === "number")
                                    object.pid = options.longs === String ? String(message.pid) : message.pid;
                                else
                                    object.pid = options.longs === String ? $util.Long.prototype.toString.call(message.pid) : options.longs === Number ? new $util.LongBits(message.pid.low >>> 0, message.pid.high >>> 0).toNumber() : message.pid;
                            if (message.postPanel_2 && message.postPanel_2.length) {
                                object.postPanel_2 = [];
                                for (let j = 0; j < message.postPanel_2.length; ++j)
                                    object.postPanel_2[j] = $root.bilibili.community.service.dm.v1.PostPanelV2.toObject(message.postPanel_2[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this DmSubView to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DmSubView.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DmSubView
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
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

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
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

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                let message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Any
             * @function getTypeUrl
             * @memberof google.protobuf.Any
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
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
