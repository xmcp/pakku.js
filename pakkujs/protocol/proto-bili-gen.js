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
                         * @property {number|null} [count] DmWebViewReply count
                         * @property {Array.<bilibili.community.service.dm.v1.ICommandDm>|null} [commandDms] DmWebViewReply commandDms
                         * @property {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig|null} [dmSetting] DmWebViewReply dmSetting
                         * @property {Array.<string>|null} [reportFilter] DmWebViewReply reportFilter
                         * @property {Array.<bilibili.community.service.dm.v1.IExpressions>|null} [expressions] DmWebViewReply expressions
                         * @property {Array.<bilibili.community.service.dm.v1.IPostPanel>|null} [postPanel] DmWebViewReply postPanel
                         * @property {Array.<string>|null} [activityMetas] DmWebViewReply activityMetas
                         * @property {Array.<bilibili.community.service.dm.v1.IPostPanelV2>|null} [postPanelV2] DmWebViewReply postPanelV2
                         * @property {Array.<bilibili.community.service.dm.v1.IDmSubView>|null} [subViews] DmWebViewReply subViews
                         * @property {bilibili.community.service.dm.v1.IQoeInfo|null} [qoe] DmWebViewReply qoe
                         * @property {Array.<bilibili.community.service.dm.v1.IDmMaskWall>|null} [maskWalls] DmWebViewReply maskWalls
                         * @property {bilibili.community.service.dm.v1.IDMRestrict|null} [dmRestrict] DmWebViewReply dmRestrict
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
                            this.maskWalls = [];
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
                         * @member {number} count
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
                         * DmWebViewReply maskWalls.
                         * @member {Array.<bilibili.community.service.dm.v1.IDmMaskWall>} maskWalls
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.maskWalls = $util.emptyArray;

                        /**
                         * DmWebViewReply dmRestrict.
                         * @member {bilibili.community.service.dm.v1.IDMRestrict|null|undefined} dmRestrict
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.dmRestrict = null;

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
                            if (message.maskWalls != null && message.maskWalls.length)
                                for (let i = 0; i < message.maskWalls.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DmMaskWall.encode(message.maskWalls[i], writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
                            if (message.dmRestrict != null && Object.hasOwnProperty.call(message, "dmRestrict"))
                                $root.bilibili.community.service.dm.v1.DMRestrict.encode(message.dmRestrict, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
                            return writer;
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
                                case 18: {
                                        if (!(message.maskWalls && message.maskWalls.length))
                                            message.maskWalls = [];
                                        message.maskWalls.push($root.bilibili.community.service.dm.v1.DmMaskWall.decode(reader, reader.uint32()));
                                        break;
                                    }
                                case 19: {
                                        message.dmRestrict = $root.bilibili.community.service.dm.v1.DMRestrict.decode(reader, reader.uint32());
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

                    v1.DMRestrict = (function() {

                        /**
                         * Properties of a DMRestrict.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDMRestrict
                         * @property {Array.<bilibili.community.service.dm.v1.IDMRestrictPeriod>|null} [periods] DMRestrict periods
                         */

                        /**
                         * Constructs a new DMRestrict.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DMRestrict.
                         * @implements IDMRestrict
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDMRestrict=} [properties] Properties to set
                         */
                        function DMRestrict(properties) {
                            this.periods = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DMRestrict periods.
                         * @member {Array.<bilibili.community.service.dm.v1.IDMRestrictPeriod>} periods
                         * @memberof bilibili.community.service.dm.v1.DMRestrict
                         * @instance
                         */
                        DMRestrict.prototype.periods = $util.emptyArray;

                        /**
                         * Encodes the specified DMRestrict message. Does not implicitly {@link bilibili.community.service.dm.v1.DMRestrict.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DMRestrict
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDMRestrict} message DMRestrict message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DMRestrict.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.periods != null && message.periods.length)
                                for (let i = 0; i < message.periods.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DMRestrictPeriod.encode(message.periods[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Decodes a DMRestrict message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DMRestrict
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DMRestrict} DMRestrict
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DMRestrict.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DMRestrict();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.periods && message.periods.length))
                                            message.periods = [];
                                        message.periods.push($root.bilibili.community.service.dm.v1.DMRestrictPeriod.decode(reader, reader.uint32()));
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
                         * Gets the default type url for DMRestrict
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DMRestrict
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DMRestrict.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DMRestrict";
                        };

                        return DMRestrict;
                    })();

                    v1.DMRestrictPeriod = (function() {

                        /**
                         * Properties of a DMRestrictPeriod.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDMRestrictPeriod
                         * @property {number|null} [start] DMRestrictPeriod start
                         * @property {number|null} [end] DMRestrictPeriod end
                         */

                        /**
                         * Constructs a new DMRestrictPeriod.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DMRestrictPeriod.
                         * @implements IDMRestrictPeriod
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDMRestrictPeriod=} [properties] Properties to set
                         */
                        function DMRestrictPeriod(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DMRestrictPeriod start.
                         * @member {number} start
                         * @memberof bilibili.community.service.dm.v1.DMRestrictPeriod
                         * @instance
                         */
                        DMRestrictPeriod.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DMRestrictPeriod end.
                         * @member {number} end
                         * @memberof bilibili.community.service.dm.v1.DMRestrictPeriod
                         * @instance
                         */
                        DMRestrictPeriod.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * Encodes the specified DMRestrictPeriod message. Does not implicitly {@link bilibili.community.service.dm.v1.DMRestrictPeriod.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DMRestrictPeriod
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDMRestrictPeriod} message DMRestrictPeriod message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DMRestrictPeriod.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.start);
                            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.end);
                            return writer;
                        };

                        /**
                         * Decodes a DMRestrictPeriod message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DMRestrictPeriod
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DMRestrictPeriod} DMRestrictPeriod
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DMRestrictPeriod.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DMRestrictPeriod();
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
                         * Gets the default type url for DMRestrictPeriod
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DMRestrictPeriod
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DMRestrictPeriod.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DMRestrictPeriod";
                        };

                        return DMRestrictPeriod;
                    })();

                    v1.DmMaskWall = (function() {

                        /**
                         * Properties of a DmMaskWall.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmMaskWall
                         * @property {number|null} [start] DmMaskWall start
                         * @property {number|null} [end] DmMaskWall end
                         * @property {string|null} [content] DmMaskWall content
                         * @property {bilibili.community.service.dm.v1.DmMaskWallContentType|null} [contentType] DmMaskWall contentType
                         * @property {bilibili.community.service.dm.v1.DmMaskWallBizType|null} [bizType] DmMaskWall bizType
                         * @property {Array.<bilibili.community.service.dm.v1.IDmMaskWallContent>|null} [contents] DmMaskWall contents
                         */

                        /**
                         * Constructs a new DmMaskWall.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmMaskWall.
                         * @implements IDmMaskWall
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmMaskWall=} [properties] Properties to set
                         */
                        function DmMaskWall(properties) {
                            this.contents = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DmMaskWall start.
                         * @member {number} start
                         * @memberof bilibili.community.service.dm.v1.DmMaskWall
                         * @instance
                         */
                        DmMaskWall.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DmMaskWall end.
                         * @member {number} end
                         * @memberof bilibili.community.service.dm.v1.DmMaskWall
                         * @instance
                         */
                        DmMaskWall.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DmMaskWall content.
                         * @member {string} content
                         * @memberof bilibili.community.service.dm.v1.DmMaskWall
                         * @instance
                         */
                        DmMaskWall.prototype.content = "";

                        /**
                         * DmMaskWall contentType.
                         * @member {bilibili.community.service.dm.v1.DmMaskWallContentType} contentType
                         * @memberof bilibili.community.service.dm.v1.DmMaskWall
                         * @instance
                         */
                        DmMaskWall.prototype.contentType = 0;

                        /**
                         * DmMaskWall bizType.
                         * @member {bilibili.community.service.dm.v1.DmMaskWallBizType} bizType
                         * @memberof bilibili.community.service.dm.v1.DmMaskWall
                         * @instance
                         */
                        DmMaskWall.prototype.bizType = 0;

                        /**
                         * DmMaskWall contents.
                         * @member {Array.<bilibili.community.service.dm.v1.IDmMaskWallContent>} contents
                         * @memberof bilibili.community.service.dm.v1.DmMaskWall
                         * @instance
                         */
                        DmMaskWall.prototype.contents = $util.emptyArray;

                        /**
                         * Encodes the specified DmMaskWall message. Does not implicitly {@link bilibili.community.service.dm.v1.DmMaskWall.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmMaskWall
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmMaskWall} message DmMaskWall message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmMaskWall.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.start);
                            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.end);
                            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                                writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
                            if (message.contentType != null && Object.hasOwnProperty.call(message, "contentType"))
                                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.contentType);
                            if (message.bizType != null && Object.hasOwnProperty.call(message, "bizType"))
                                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.bizType);
                            if (message.contents != null && message.contents.length)
                                for (let i = 0; i < message.contents.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DmMaskWallContent.encode(message.contents[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Decodes a DmMaskWall message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmMaskWall
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmMaskWall} DmMaskWall
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmMaskWall.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmMaskWall();
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
                                        message.content = reader.string();
                                        break;
                                    }
                                case 4: {
                                        message.contentType = reader.int32();
                                        break;
                                    }
                                case 5: {
                                        message.bizType = reader.int32();
                                        break;
                                    }
                                case 6: {
                                        if (!(message.contents && message.contents.length))
                                            message.contents = [];
                                        message.contents.push($root.bilibili.community.service.dm.v1.DmMaskWallContent.decode(reader, reader.uint32()));
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
                         * Gets the default type url for DmMaskWall
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DmMaskWall
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DmMaskWall.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmMaskWall";
                        };

                        return DmMaskWall;
                    })();

                    /**
                     * DmMaskWallBizType enum.
                     * @name bilibili.community.service.dm.v1.DmMaskWallBizType
                     * @enum {number}
                     * @property {number} DmMaskWallBizTypeUnknown=0 DmMaskWallBizTypeUnknown value
                     * @property {number} DmMaskWallBizTypeOGV=1 DmMaskWallBizTypeOGV value
                     * @property {number} DmMaskWallBizTypeBizPic=2 DmMaskWallBizTypeBizPic value
                     * @property {number} DmMaskWallBizTypeMute=3 DmMaskWallBizTypeMute value
                     * @property {number} DmMaskWallBizTypeRecord=4 DmMaskWallBizTypeRecord value
                     */
                    v1.DmMaskWallBizType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "DmMaskWallBizTypeUnknown"] = 0;
                        values[valuesById[1] = "DmMaskWallBizTypeOGV"] = 1;
                        values[valuesById[2] = "DmMaskWallBizTypeBizPic"] = 2;
                        values[valuesById[3] = "DmMaskWallBizTypeMute"] = 3;
                        values[valuesById[4] = "DmMaskWallBizTypeRecord"] = 4;
                        return values;
                    })();

                    v1.DmMaskWallContent = (function() {

                        /**
                         * Properties of a DmMaskWallContent.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmMaskWallContent
                         * @property {bilibili.community.service.dm.v1.DmMaskWallContentType|null} [type] DmMaskWallContent type
                         * @property {string|null} [content] DmMaskWallContent content
                         */

                        /**
                         * Constructs a new DmMaskWallContent.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmMaskWallContent.
                         * @implements IDmMaskWallContent
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmMaskWallContent=} [properties] Properties to set
                         */
                        function DmMaskWallContent(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DmMaskWallContent type.
                         * @member {bilibili.community.service.dm.v1.DmMaskWallContentType} type
                         * @memberof bilibili.community.service.dm.v1.DmMaskWallContent
                         * @instance
                         */
                        DmMaskWallContent.prototype.type = 0;

                        /**
                         * DmMaskWallContent content.
                         * @member {string} content
                         * @memberof bilibili.community.service.dm.v1.DmMaskWallContent
                         * @instance
                         */
                        DmMaskWallContent.prototype.content = "";

                        /**
                         * Encodes the specified DmMaskWallContent message. Does not implicitly {@link bilibili.community.service.dm.v1.DmMaskWallContent.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmMaskWallContent
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmMaskWallContent} message DmMaskWallContent message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmMaskWallContent.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
                            return writer;
                        };

                        /**
                         * Decodes a DmMaskWallContent message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmMaskWallContent
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmMaskWallContent} DmMaskWallContent
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmMaskWallContent.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmMaskWallContent();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.type = reader.int32();
                                        break;
                                    }
                                case 2: {
                                        message.content = reader.string();
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
                         * Gets the default type url for DmMaskWallContent
                         * @function getTypeUrl
                         * @memberof bilibili.community.service.dm.v1.DmMaskWallContent
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DmMaskWallContent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/bilibili.community.service.dm.v1.DmMaskWallContent";
                        };

                        return DmMaskWallContent;
                    })();

                    /**
                     * DmMaskWallContentType enum.
                     * @name bilibili.community.service.dm.v1.DmMaskWallContentType
                     * @enum {number}
                     * @property {number} DmMaskWallContentTypeUnknown=0 DmMaskWallContentTypeUnknown value
                     * @property {number} DmMaskWallContentTypeText=1 DmMaskWallContentTypeText value
                     * @property {number} DmMaskWallContentTypePic=2 DmMaskWallContentTypePic value
                     */
                    v1.DmMaskWallContentType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "DmMaskWallContentTypeUnknown"] = 0;
                        values[valuesById[1] = "DmMaskWallContentTypeText"] = 1;
                        values[valuesById[2] = "DmMaskWallContentTypePic"] = 2;
                        return values;
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
                         * @property {number|null} [start] PostPanel start
                         * @property {number|null} [end] PostPanel end
                         * @property {number|null} [priority] PostPanel priority
                         * @property {number|null} [bizId] PostPanel bizId
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
                         * @member {number} start
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanel end.
                         * @member {number} end
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanel priority.
                         * @member {number} priority
                         * @memberof bilibili.community.service.dm.v1.PostPanel
                         * @instance
                         */
                        PostPanel.prototype.priority = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanel bizId.
                         * @member {number} bizId
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
                         * @property {number|null} [start] PostPanelV2 start
                         * @property {number|null} [end] PostPanelV2 end
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
                         * @member {number} start
                         * @memberof bilibili.community.service.dm.v1.PostPanelV2
                         * @instance
                         */
                        PostPanelV2.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * PostPanelV2 end.
                         * @member {number} end
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
                         * @property {number|null} [oid] CommandDm oid
                         * @property {number|null} [mid] CommandDm mid
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
                         * @member {number} oid
                         * @memberof bilibili.community.service.dm.v1.CommandDm
                         * @instance
                         */
                        CommandDm.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * CommandDm mid.
                         * @member {number} mid
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
                         * @property {number|null} [pageSize] DmSegConfig pageSize
                         * @property {number|null} [total] DmSegConfig total
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
                         * @member {number} pageSize
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @instance
                         */
                        DmSegConfig.prototype.pageSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DmSegConfig total.
                         * @member {number} total
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @instance
                         */
                        DmSegConfig.prototype.total = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
                         * @property {number|null} [date] DanmakuElem date
                         * @property {number|null} [weight] DanmakuElem weight
                         * @property {string|null} [action] DanmakuElem action
                         * @property {number|null} [pool] DanmakuElem pool
                         * @property {string|null} [dmid] DanmakuElem dmid
                         * @property {number|null} [attr] DanmakuElem attr
                         * @property {number|null} [likeCount] DanmakuElem likeCount
                         * @property {string|null} [animation] DanmakuElem animation
                         * @property {bilibili.community.service.dm.v1.DmColorfulType|null} [colorful] DanmakuElem colorful
                         * @property {number|null} [oid] DanmakuElem oid
                         * @property {bilibili.community.service.dm.v1.DmFromType|null} [dmFrom] DanmakuElem dmFrom
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
                         * @member {number} date
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
                         * DanmakuElem likeCount.
                         * @member {number} likeCount
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.likeCount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
                         * @member {number} oid
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DanmakuElem dmFrom.
                         * @member {bilibili.community.service.dm.v1.DmFromType} dmFrom
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.dmFrom = 0;

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
                            if (message.likeCount != null && Object.hasOwnProperty.call(message, "likeCount"))
                                writer.uint32(/* id 15, wireType 0 =*/120).int64(message.likeCount);
                            if (message.animation != null && Object.hasOwnProperty.call(message, "animation"))
                                writer.uint32(/* id 22, wireType 2 =*/178).string(message.animation);
                            if (message.colorful != null && Object.hasOwnProperty.call(message, "colorful"))
                                writer.uint32(/* id 24, wireType 0 =*/192).int32(message.colorful);
                            if (message.oid != null && Object.hasOwnProperty.call(message, "oid"))
                                writer.uint32(/* id 26, wireType 0 =*/208).int64(message.oid);
                            if (message.dmFrom != null && Object.hasOwnProperty.call(message, "dmFrom"))
                                writer.uint32(/* id 27, wireType 0 =*/216).int32(message.dmFrom);
                            return writer;
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
                                case 15: {
                                        message.likeCount = reader.int64();
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
                                case 27: {
                                        message.dmFrom = reader.int32();
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

                    /**
                     * DmFromType enum.
                     * @name bilibili.community.service.dm.v1.DmFromType
                     * @enum {number}
                     * @property {number} DmFromUnknown=0 DmFromUnknown value
                     * @property {number} DmFromNormal=1 DmFromNormal value
                     * @property {number} DmFromCmd=2 DmFromCmd value
                     * @property {number} DmFromLive=3 DmFromLive value
                     */
                    v1.DmFromType = (function() {
                        const valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "DmFromUnknown"] = 0;
                        values[valuesById[1] = "DmFromNormal"] = 1;
                        values[valuesById[2] = "DmFromCmd"] = 2;
                        values[valuesById[3] = "DmFromLive"] = 3;
                        return values;
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
                         * @property {number|null} [speedplus] DanmuWebPlayerConfig speedplus
                         * @property {number|null} [fontsize] DanmuWebPlayerConfig fontsize
                         * @property {boolean|null} [fullscreensync] DanmuWebPlayerConfig fullscreensync
                         * @property {boolean|null} [speedsync] DanmuWebPlayerConfig speedsync
                         * @property {string|null} [fontfamily] DanmuWebPlayerConfig fontfamily
                         * @property {boolean|null} [bold] DanmuWebPlayerConfig bold
                         * @property {number|null} [fontborder] DanmuWebPlayerConfig fontborder
                         * @property {number|null} [seniorModeSwitch] DanmuWebPlayerConfig seniorModeSwitch
                         * @property {boolean|null} [typeTopBottom] DanmuWebPlayerConfig typeTopBottom
                         * @property {number|null} [dmarea] DanmuWebPlayerConfig dmarea
                         * @property {number|null} [dmdensity] DanmuWebPlayerConfig dmdensity
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
                         * DanmuWebPlayerConfig typeTopBottom.
                         * @member {boolean} typeTopBottom
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.typeTopBottom = false;

                        /**
                         * DanmuWebPlayerConfig dmarea.
                         * @member {number} dmarea
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.dmarea = 0;

                        /**
                         * DanmuWebPlayerConfig dmdensity.
                         * @member {number} dmdensity
                         * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                         * @instance
                         */
                        DanmuWebPlayerConfig.prototype.dmdensity = 0;

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
                            if (message.typeTopBottom != null && Object.hasOwnProperty.call(message, "typeTopBottom"))
                                writer.uint32(/* id 24, wireType 0 =*/192).bool(message.typeTopBottom);
                            if (message.dmarea != null && Object.hasOwnProperty.call(message, "dmarea"))
                                writer.uint32(/* id 25, wireType 0 =*/200).int32(message.dmarea);
                            if (message.dmdensity != null && Object.hasOwnProperty.call(message, "dmdensity"))
                                writer.uint32(/* id 26, wireType 0 =*/208).int32(message.dmdensity);
                            return writer;
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
                                case 24: {
                                        message.typeTopBottom = reader.bool();
                                        break;
                                    }
                                case 25: {
                                        message.dmarea = reader.int32();
                                        break;
                                    }
                                case 26: {
                                        message.dmdensity = reader.int32();
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
                         * @property {number|null} [start] Period start
                         * @property {number|null} [end] Period end
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
                         * @member {number} start
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @instance
                         */
                        Period.prototype.start = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * Period end.
                         * @member {number} end
                         * @memberof bilibili.community.service.dm.v1.Period
                         * @instance
                         */
                        Period.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

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
                         * @property {number|null} [oid] DmSubView oid
                         * @property {number|null} [pid] DmSubView pid
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
                         * @member {number} oid
                         * @memberof bilibili.community.service.dm.v1.DmSubView
                         * @instance
                         */
                        DmSubView.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DmSubView pid.
                         * @member {number} pid
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
