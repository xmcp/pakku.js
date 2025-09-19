import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace bilibili. */
export namespace bilibili {

    /** Namespace community. */
    namespace community {

        /** Namespace service. */
        namespace service {

            /** Namespace dm. */
            namespace dm {

                /** Namespace v1. */
                namespace v1 {

                    /** Properties of a DmWebViewReply. */
                    interface IDmWebViewReply {

                        /** DmWebViewReply state */
                        state?: (number|null);

                        /** DmWebViewReply text */
                        text?: (string|null);

                        /** DmWebViewReply textSide */
                        textSide?: (string|null);

                        /** DmWebViewReply dmSge */
                        dmSge?: (bilibili.community.service.dm.v1.IDmSegConfig|null);

                        /** DmWebViewReply flag */
                        flag?: (bilibili.community.service.dm.v1.IDanmakuFlagConfig|null);

                        /** DmWebViewReply specialDms */
                        specialDms?: (string[]|null);

                        /** DmWebViewReply checkBox */
                        checkBox?: (boolean|null);

                        /** DmWebViewReply count */
                        count?: (number|null);

                        /** DmWebViewReply commandDms */
                        commandDms?: (bilibili.community.service.dm.v1.ICommandDm[]|null);

                        /** DmWebViewReply dmSetting */
                        dmSetting?: (bilibili.community.service.dm.v1.IDanmuWebPlayerConfig|null);

                        /** DmWebViewReply reportFilter */
                        reportFilter?: (string[]|null);

                        /** DmWebViewReply expressions */
                        expressions?: (bilibili.community.service.dm.v1.IExpressions[]|null);

                        /** DmWebViewReply postPanel */
                        postPanel?: (bilibili.community.service.dm.v1.IPostPanel[]|null);

                        /** DmWebViewReply activityMetas */
                        activityMetas?: (string[]|null);

                        /** DmWebViewReply postPanelV2 */
                        postPanelV2?: (bilibili.community.service.dm.v1.IPostPanelV2[]|null);

                        /** DmWebViewReply subViews */
                        subViews?: (bilibili.community.service.dm.v1.IDmSubView[]|null);

                        /** DmWebViewReply qoe */
                        qoe?: (bilibili.community.service.dm.v1.IQoeInfo|null);

                        /** DmWebViewReply maskWalls */
                        maskWalls?: (bilibili.community.service.dm.v1.IDmMaskWall[]|null);

                        /** DmWebViewReply dmRestrict */
                        dmRestrict?: (bilibili.community.service.dm.v1.IDMRestrict|null);
                    }

                    /** Represents a DmWebViewReply. */
                    class DmWebViewReply implements IDmWebViewReply {

                        /**
                         * Constructs a new DmWebViewReply.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDmWebViewReply);

                        /** DmWebViewReply state. */
                        public state: number;

                        /** DmWebViewReply text. */
                        public text: string;

                        /** DmWebViewReply textSide. */
                        public textSide: string;

                        /** DmWebViewReply dmSge. */
                        public dmSge?: (bilibili.community.service.dm.v1.IDmSegConfig|null);

                        /** DmWebViewReply flag. */
                        public flag?: (bilibili.community.service.dm.v1.IDanmakuFlagConfig|null);

                        /** DmWebViewReply specialDms. */
                        public specialDms: string[];

                        /** DmWebViewReply checkBox. */
                        public checkBox: boolean;

                        /** DmWebViewReply count. */
                        public count: number;

                        /** DmWebViewReply commandDms. */
                        public commandDms: bilibili.community.service.dm.v1.ICommandDm[];

                        /** DmWebViewReply dmSetting. */
                        public dmSetting?: (bilibili.community.service.dm.v1.IDanmuWebPlayerConfig|null);

                        /** DmWebViewReply reportFilter. */
                        public reportFilter: string[];

                        /** DmWebViewReply expressions. */
                        public expressions: bilibili.community.service.dm.v1.IExpressions[];

                        /** DmWebViewReply postPanel. */
                        public postPanel: bilibili.community.service.dm.v1.IPostPanel[];

                        /** DmWebViewReply activityMetas. */
                        public activityMetas: string[];

                        /** DmWebViewReply postPanelV2. */
                        public postPanelV2: bilibili.community.service.dm.v1.IPostPanelV2[];

                        /** DmWebViewReply subViews. */
                        public subViews: bilibili.community.service.dm.v1.IDmSubView[];

                        /** DmWebViewReply qoe. */
                        public qoe?: (bilibili.community.service.dm.v1.IQoeInfo|null);

                        /** DmWebViewReply maskWalls. */
                        public maskWalls: bilibili.community.service.dm.v1.IDmMaskWall[];

                        /** DmWebViewReply dmRestrict. */
                        public dmRestrict?: (bilibili.community.service.dm.v1.IDMRestrict|null);

                        /**
                         * Encodes the specified DmWebViewReply message. Does not implicitly {@link bilibili.community.service.dm.v1.DmWebViewReply.verify|verify} messages.
                         * @param message DmWebViewReply message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDmWebViewReply, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DmWebViewReply message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DmWebViewReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DmWebViewReply;

                        /**
                         * Gets the default type url for DmWebViewReply
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a DMRestrict. */
                    interface IDMRestrict {

                        /** DMRestrict periods */
                        periods?: (bilibili.community.service.dm.v1.IDMRestrictPeriod[]|null);
                    }

                    /** Represents a DMRestrict. */
                    class DMRestrict implements IDMRestrict {

                        /**
                         * Constructs a new DMRestrict.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDMRestrict);

                        /** DMRestrict periods. */
                        public periods: bilibili.community.service.dm.v1.IDMRestrictPeriod[];

                        /**
                         * Encodes the specified DMRestrict message. Does not implicitly {@link bilibili.community.service.dm.v1.DMRestrict.verify|verify} messages.
                         * @param message DMRestrict message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDMRestrict, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DMRestrict message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DMRestrict
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DMRestrict;

                        /**
                         * Gets the default type url for DMRestrict
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a DMRestrictPeriod. */
                    interface IDMRestrictPeriod {

                        /** DMRestrictPeriod start */
                        start?: (number|null);

                        /** DMRestrictPeriod end */
                        end?: (number|null);
                    }

                    /** Represents a DMRestrictPeriod. */
                    class DMRestrictPeriod implements IDMRestrictPeriod {

                        /**
                         * Constructs a new DMRestrictPeriod.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDMRestrictPeriod);

                        /** DMRestrictPeriod start. */
                        public start: number;

                        /** DMRestrictPeriod end. */
                        public end: number;

                        /**
                         * Encodes the specified DMRestrictPeriod message. Does not implicitly {@link bilibili.community.service.dm.v1.DMRestrictPeriod.verify|verify} messages.
                         * @param message DMRestrictPeriod message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDMRestrictPeriod, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DMRestrictPeriod message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DMRestrictPeriod
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DMRestrictPeriod;

                        /**
                         * Gets the default type url for DMRestrictPeriod
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a DmMaskWall. */
                    interface IDmMaskWall {

                        /** DmMaskWall start */
                        start?: (number|null);

                        /** DmMaskWall end */
                        end?: (number|null);

                        /** DmMaskWall content */
                        content?: (string|null);

                        /** DmMaskWall contentType */
                        contentType?: (bilibili.community.service.dm.v1.DmMaskWallContentType|null);

                        /** DmMaskWall bizType */
                        bizType?: (bilibili.community.service.dm.v1.DmMaskWallBizType|null);

                        /** DmMaskWall contents */
                        contents?: (bilibili.community.service.dm.v1.IDmMaskWallContent[]|null);
                    }

                    /** Represents a DmMaskWall. */
                    class DmMaskWall implements IDmMaskWall {

                        /**
                         * Constructs a new DmMaskWall.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDmMaskWall);

                        /** DmMaskWall start. */
                        public start: number;

                        /** DmMaskWall end. */
                        public end: number;

                        /** DmMaskWall content. */
                        public content: string;

                        /** DmMaskWall contentType. */
                        public contentType: bilibili.community.service.dm.v1.DmMaskWallContentType;

                        /** DmMaskWall bizType. */
                        public bizType: bilibili.community.service.dm.v1.DmMaskWallBizType;

                        /** DmMaskWall contents. */
                        public contents: bilibili.community.service.dm.v1.IDmMaskWallContent[];

                        /**
                         * Encodes the specified DmMaskWall message. Does not implicitly {@link bilibili.community.service.dm.v1.DmMaskWall.verify|verify} messages.
                         * @param message DmMaskWall message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDmMaskWall, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DmMaskWall message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DmMaskWall
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DmMaskWall;

                        /**
                         * Gets the default type url for DmMaskWall
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** DmMaskWallBizType enum. */
                    enum DmMaskWallBizType {
                        DmMaskWallBizTypeUnknown = 0,
                        DmMaskWallBizTypeOGV = 1,
                        DmMaskWallBizTypeBizPic = 2,
                        DmMaskWallBizTypeMute = 3,
                        DmMaskWallBizTypeRecord = 4
                    }

                    /** Properties of a DmMaskWallContent. */
                    interface IDmMaskWallContent {

                        /** DmMaskWallContent type */
                        type?: (bilibili.community.service.dm.v1.DmMaskWallContentType|null);

                        /** DmMaskWallContent content */
                        content?: (string|null);
                    }

                    /** Represents a DmMaskWallContent. */
                    class DmMaskWallContent implements IDmMaskWallContent {

                        /**
                         * Constructs a new DmMaskWallContent.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDmMaskWallContent);

                        /** DmMaskWallContent type. */
                        public type: bilibili.community.service.dm.v1.DmMaskWallContentType;

                        /** DmMaskWallContent content. */
                        public content: string;

                        /**
                         * Encodes the specified DmMaskWallContent message. Does not implicitly {@link bilibili.community.service.dm.v1.DmMaskWallContent.verify|verify} messages.
                         * @param message DmMaskWallContent message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDmMaskWallContent, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DmMaskWallContent message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DmMaskWallContent
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DmMaskWallContent;

                        /**
                         * Gets the default type url for DmMaskWallContent
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** DmMaskWallContentType enum. */
                    enum DmMaskWallContentType {
                        DmMaskWallContentTypeUnknown = 0,
                        DmMaskWallContentTypeText = 1,
                        DmMaskWallContentTypePic = 2
                    }

                    /** Properties of a QoeInfo. */
                    interface IQoeInfo {

                        /** QoeInfo info */
                        info?: (string|null);
                    }

                    /** Represents a QoeInfo. */
                    class QoeInfo implements IQoeInfo {

                        /**
                         * Constructs a new QoeInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IQoeInfo);

                        /** QoeInfo info. */
                        public info: string;

                        /**
                         * Encodes the specified QoeInfo message. Does not implicitly {@link bilibili.community.service.dm.v1.QoeInfo.verify|verify} messages.
                         * @param message QoeInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IQoeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a QoeInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns QoeInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.QoeInfo;

                        /**
                         * Gets the default type url for QoeInfo
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a PostPanel. */
                    interface IPostPanel {

                        /** PostPanel start */
                        start?: (number|null);

                        /** PostPanel end */
                        end?: (number|null);

                        /** PostPanel priority */
                        priority?: (number|null);

                        /** PostPanel bizId */
                        bizId?: (number|null);

                        /** PostPanel bizType */
                        bizType?: (bilibili.community.service.dm.v1.PostPanelBizType|null);

                        /** PostPanel clickButton */
                        clickButton?: (bilibili.community.service.dm.v1.IClickButton|null);

                        /** PostPanel textInput */
                        textInput?: (bilibili.community.service.dm.v1.ITextInput|null);

                        /** PostPanel checkBox */
                        checkBox?: (bilibili.community.service.dm.v1.ICheckBox|null);

                        /** PostPanel toast */
                        toast?: (bilibili.community.service.dm.v1.IToast|null);
                    }

                    /** Represents a PostPanel. */
                    class PostPanel implements IPostPanel {

                        /**
                         * Constructs a new PostPanel.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IPostPanel);

                        /** PostPanel start. */
                        public start: number;

                        /** PostPanel end. */
                        public end: number;

                        /** PostPanel priority. */
                        public priority: number;

                        /** PostPanel bizId. */
                        public bizId: number;

                        /** PostPanel bizType. */
                        public bizType: bilibili.community.service.dm.v1.PostPanelBizType;

                        /** PostPanel clickButton. */
                        public clickButton?: (bilibili.community.service.dm.v1.IClickButton|null);

                        /** PostPanel textInput. */
                        public textInput?: (bilibili.community.service.dm.v1.ITextInput|null);

                        /** PostPanel checkBox. */
                        public checkBox?: (bilibili.community.service.dm.v1.ICheckBox|null);

                        /** PostPanel toast. */
                        public toast?: (bilibili.community.service.dm.v1.IToast|null);

                        /**
                         * Encodes the specified PostPanel message. Does not implicitly {@link bilibili.community.service.dm.v1.PostPanel.verify|verify} messages.
                         * @param message PostPanel message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IPostPanel, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a PostPanel message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns PostPanel
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.PostPanel;

                        /**
                         * Gets the default type url for PostPanel
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a PostPanelV2. */
                    interface IPostPanelV2 {

                        /** PostPanelV2 start */
                        start?: (number|null);

                        /** PostPanelV2 end */
                        end?: (number|null);

                        /** PostPanelV2 bizType */
                        bizType?: (bilibili.community.service.dm.v1.PostPanelBizType|null);

                        /** PostPanelV2 clickButton */
                        clickButton?: (bilibili.community.service.dm.v1.IClickButtonV2|null);

                        /** PostPanelV2 textInput */
                        textInput?: (bilibili.community.service.dm.v1.ITextInputV2|null);

                        /** PostPanelV2 checkBox */
                        checkBox?: (bilibili.community.service.dm.v1.ICheckBoxV2|null);

                        /** PostPanelV2 toast */
                        toast?: (bilibili.community.service.dm.v1.IToastV2|null);

                        /** PostPanelV2 bubble */
                        bubble?: (bilibili.community.service.dm.v1.IBubbleV2|null);

                        /** PostPanelV2 label */
                        label?: (bilibili.community.service.dm.v1.ILabelV2|null);

                        /** PostPanelV2 postStatus */
                        postStatus?: (bilibili.community.service.dm.v1.PostStatus|null);
                    }

                    /** Represents a PostPanelV2. */
                    class PostPanelV2 implements IPostPanelV2 {

                        /**
                         * Constructs a new PostPanelV2.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IPostPanelV2);

                        /** PostPanelV2 start. */
                        public start: number;

                        /** PostPanelV2 end. */
                        public end: number;

                        /** PostPanelV2 bizType. */
                        public bizType: bilibili.community.service.dm.v1.PostPanelBizType;

                        /** PostPanelV2 clickButton. */
                        public clickButton?: (bilibili.community.service.dm.v1.IClickButtonV2|null);

                        /** PostPanelV2 textInput. */
                        public textInput?: (bilibili.community.service.dm.v1.ITextInputV2|null);

                        /** PostPanelV2 checkBox. */
                        public checkBox?: (bilibili.community.service.dm.v1.ICheckBoxV2|null);

                        /** PostPanelV2 toast. */
                        public toast?: (bilibili.community.service.dm.v1.IToastV2|null);

                        /** PostPanelV2 bubble. */
                        public bubble?: (bilibili.community.service.dm.v1.IBubbleV2|null);

                        /** PostPanelV2 label. */
                        public label?: (bilibili.community.service.dm.v1.ILabelV2|null);

                        /** PostPanelV2 postStatus. */
                        public postStatus: bilibili.community.service.dm.v1.PostStatus;

                        /**
                         * Encodes the specified PostPanelV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.PostPanelV2.verify|verify} messages.
                         * @param message PostPanelV2 message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IPostPanelV2, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a PostPanelV2 message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns PostPanelV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.PostPanelV2;

                        /**
                         * Gets the default type url for PostPanelV2
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a ClickButton. */
                    interface IClickButton {

                        /** ClickButton portraitText */
                        portraitText?: (string[]|null);

                        /** ClickButton landscapeText */
                        landscapeText?: (string[]|null);

                        /** ClickButton portraitTextFocus */
                        portraitTextFocus?: (string[]|null);

                        /** ClickButton landscapeTextFocus */
                        landscapeTextFocus?: (string[]|null);

                        /** ClickButton renderType */
                        renderType?: (bilibili.community.service.dm.v1.RenderType|null);

                        /** ClickButton show */
                        show?: (boolean|null);
                    }

                    /** Represents a ClickButton. */
                    class ClickButton implements IClickButton {

                        /**
                         * Constructs a new ClickButton.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IClickButton);

                        /** ClickButton portraitText. */
                        public portraitText: string[];

                        /** ClickButton landscapeText. */
                        public landscapeText: string[];

                        /** ClickButton portraitTextFocus. */
                        public portraitTextFocus: string[];

                        /** ClickButton landscapeTextFocus. */
                        public landscapeTextFocus: string[];

                        /** ClickButton renderType. */
                        public renderType: bilibili.community.service.dm.v1.RenderType;

                        /** ClickButton show. */
                        public show: boolean;

                        /**
                         * Encodes the specified ClickButton message. Does not implicitly {@link bilibili.community.service.dm.v1.ClickButton.verify|verify} messages.
                         * @param message ClickButton message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IClickButton, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ClickButton message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ClickButton
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.ClickButton;

                        /**
                         * Gets the default type url for ClickButton
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a ClickButtonV2. */
                    interface IClickButtonV2 {

                        /** ClickButtonV2 portraitText */
                        portraitText?: (string[]|null);

                        /** ClickButtonV2 landscapeText */
                        landscapeText?: (string[]|null);

                        /** ClickButtonV2 portraitTextFocus */
                        portraitTextFocus?: (string[]|null);

                        /** ClickButtonV2 landscapeTextFocus */
                        landscapeTextFocus?: (string[]|null);

                        /** ClickButtonV2 renderType */
                        renderType?: (bilibili.community.service.dm.v1.RenderType|null);

                        /** ClickButtonV2 textInputPost */
                        textInputPost?: (boolean|null);

                        /** ClickButtonV2 exposureOnce */
                        exposureOnce?: (boolean|null);

                        /** ClickButtonV2 exposureType */
                        exposureType?: (bilibili.community.service.dm.v1.ExposureType|null);
                    }

                    /** Represents a ClickButtonV2. */
                    class ClickButtonV2 implements IClickButtonV2 {

                        /**
                         * Constructs a new ClickButtonV2.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IClickButtonV2);

                        /** ClickButtonV2 portraitText. */
                        public portraitText: string[];

                        /** ClickButtonV2 landscapeText. */
                        public landscapeText: string[];

                        /** ClickButtonV2 portraitTextFocus. */
                        public portraitTextFocus: string[];

                        /** ClickButtonV2 landscapeTextFocus. */
                        public landscapeTextFocus: string[];

                        /** ClickButtonV2 renderType. */
                        public renderType: bilibili.community.service.dm.v1.RenderType;

                        /** ClickButtonV2 textInputPost. */
                        public textInputPost: boolean;

                        /** ClickButtonV2 exposureOnce. */
                        public exposureOnce: boolean;

                        /** ClickButtonV2 exposureType. */
                        public exposureType: bilibili.community.service.dm.v1.ExposureType;

                        /**
                         * Encodes the specified ClickButtonV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.ClickButtonV2.verify|verify} messages.
                         * @param message ClickButtonV2 message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IClickButtonV2, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ClickButtonV2 message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ClickButtonV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.ClickButtonV2;

                        /**
                         * Gets the default type url for ClickButtonV2
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** PostPanelBizType enum. */
                    enum PostPanelBizType {
                        PostPanelBizTypeNone = 0,
                        PostPanelBizTypeEncourage = 1,
                        PostPanelBizTypeFragClose = 4,
                        PostPanelBizTypeColorDM = 2
                    }

                    /** Properties of a TextInput. */
                    interface ITextInput {

                        /** TextInput portraitPlaceholder */
                        portraitPlaceholder?: (string[]|null);

                        /** TextInput landscapePlaceholder */
                        landscapePlaceholder?: (string[]|null);

                        /** TextInput renderType */
                        renderType?: (bilibili.community.service.dm.v1.RenderType|null);

                        /** TextInput placeholderPost */
                        placeholderPost?: (boolean|null);

                        /** TextInput show */
                        show?: (boolean|null);

                        /** TextInput postStatus */
                        postStatus?: (bilibili.community.service.dm.v1.PostStatus|null);
                    }

                    /** Represents a TextInput. */
                    class TextInput implements ITextInput {

                        /**
                         * Constructs a new TextInput.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.ITextInput);

                        /** TextInput portraitPlaceholder. */
                        public portraitPlaceholder: string[];

                        /** TextInput landscapePlaceholder. */
                        public landscapePlaceholder: string[];

                        /** TextInput renderType. */
                        public renderType: bilibili.community.service.dm.v1.RenderType;

                        /** TextInput placeholderPost. */
                        public placeholderPost: boolean;

                        /** TextInput show. */
                        public show: boolean;

                        /** TextInput postStatus. */
                        public postStatus: bilibili.community.service.dm.v1.PostStatus;

                        /**
                         * Encodes the specified TextInput message. Does not implicitly {@link bilibili.community.service.dm.v1.TextInput.verify|verify} messages.
                         * @param message TextInput message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.ITextInput, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a TextInput message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns TextInput
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.TextInput;

                        /**
                         * Gets the default type url for TextInput
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a TextInputV2. */
                    interface ITextInputV2 {

                        /** TextInputV2 portraitPlaceholder */
                        portraitPlaceholder?: (string[]|null);

                        /** TextInputV2 landscapePlaceholder */
                        landscapePlaceholder?: (string[]|null);

                        /** TextInputV2 renderType */
                        renderType?: (bilibili.community.service.dm.v1.RenderType|null);

                        /** TextInputV2 placeholderPost */
                        placeholderPost?: (boolean|null);

                        /** TextInputV2 textInputLimit */
                        textInputLimit?: (number|null);
                    }

                    /** Represents a TextInputV2. */
                    class TextInputV2 implements ITextInputV2 {

                        /**
                         * Constructs a new TextInputV2.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.ITextInputV2);

                        /** TextInputV2 portraitPlaceholder. */
                        public portraitPlaceholder: string[];

                        /** TextInputV2 landscapePlaceholder. */
                        public landscapePlaceholder: string[];

                        /** TextInputV2 renderType. */
                        public renderType: bilibili.community.service.dm.v1.RenderType;

                        /** TextInputV2 placeholderPost. */
                        public placeholderPost: boolean;

                        /** TextInputV2 textInputLimit. */
                        public textInputLimit: number;

                        /**
                         * Encodes the specified TextInputV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.TextInputV2.verify|verify} messages.
                         * @param message TextInputV2 message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.ITextInputV2, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a TextInputV2 message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns TextInputV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.TextInputV2;

                        /**
                         * Gets the default type url for TextInputV2
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** PostStatus enum. */
                    enum PostStatus {
                        PostStatusNormal = 0,
                        PostStatusClosed = 1
                    }

                    /** RenderType enum. */
                    enum RenderType {
                        RenderTypeNone = 0,
                        RenderTypeSingle = 1,
                        RenderTypeRotation = 2
                    }

                    /** Properties of a CheckBox. */
                    interface ICheckBox {

                        /** CheckBox text */
                        text?: (string|null);

                        /** CheckBox type */
                        type?: (bilibili.community.service.dm.v1.CheckboxType|null);

                        /** CheckBox defaultValue */
                        defaultValue?: (boolean|null);

                        /** CheckBox show */
                        show?: (boolean|null);
                    }

                    /** Represents a CheckBox. */
                    class CheckBox implements ICheckBox {

                        /**
                         * Constructs a new CheckBox.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.ICheckBox);

                        /** CheckBox text. */
                        public text: string;

                        /** CheckBox type. */
                        public type: bilibili.community.service.dm.v1.CheckboxType;

                        /** CheckBox defaultValue. */
                        public defaultValue: boolean;

                        /** CheckBox show. */
                        public show: boolean;

                        /**
                         * Encodes the specified CheckBox message. Does not implicitly {@link bilibili.community.service.dm.v1.CheckBox.verify|verify} messages.
                         * @param message CheckBox message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.ICheckBox, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a CheckBox message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns CheckBox
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.CheckBox;

                        /**
                         * Gets the default type url for CheckBox
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a CheckBoxV2. */
                    interface ICheckBoxV2 {

                        /** CheckBoxV2 text */
                        text?: (string|null);

                        /** CheckBoxV2 type */
                        type?: (bilibili.community.service.dm.v1.CheckboxType|null);

                        /** CheckBoxV2 defaultValue */
                        defaultValue?: (boolean|null);
                    }

                    /** Represents a CheckBoxV2. */
                    class CheckBoxV2 implements ICheckBoxV2 {

                        /**
                         * Constructs a new CheckBoxV2.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.ICheckBoxV2);

                        /** CheckBoxV2 text. */
                        public text: string;

                        /** CheckBoxV2 type. */
                        public type: bilibili.community.service.dm.v1.CheckboxType;

                        /** CheckBoxV2 defaultValue. */
                        public defaultValue: boolean;

                        /**
                         * Encodes the specified CheckBoxV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.CheckBoxV2.verify|verify} messages.
                         * @param message CheckBoxV2 message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.ICheckBoxV2, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a CheckBoxV2 message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns CheckBoxV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.CheckBoxV2;

                        /**
                         * Gets the default type url for CheckBoxV2
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** CheckboxType enum. */
                    enum CheckboxType {
                        CheckboxTypeNone = 0,
                        CheckboxTypeEncourage = 1
                    }

                    /** Properties of a Toast. */
                    interface IToast {

                        /** Toast text */
                        text?: (string|null);

                        /** Toast duration */
                        duration?: (number|null);

                        /** Toast show */
                        show?: (boolean|null);

                        /** Toast button */
                        button?: (bilibili.community.service.dm.v1.IButton|null);
                    }

                    /** Represents a Toast. */
                    class Toast implements IToast {

                        /**
                         * Constructs a new Toast.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IToast);

                        /** Toast text. */
                        public text: string;

                        /** Toast duration. */
                        public duration: number;

                        /** Toast show. */
                        public show: boolean;

                        /** Toast button. */
                        public button?: (bilibili.community.service.dm.v1.IButton|null);

                        /**
                         * Encodes the specified Toast message. Does not implicitly {@link bilibili.community.service.dm.v1.Toast.verify|verify} messages.
                         * @param message Toast message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IToast, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Toast message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Toast
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.Toast;

                        /**
                         * Gets the default type url for Toast
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a ToastV2. */
                    interface IToastV2 {

                        /** ToastV2 text */
                        text?: (string|null);

                        /** ToastV2 duration */
                        duration?: (number|null);

                        /** ToastV2 toastButtonV2 */
                        toastButtonV2?: (bilibili.community.service.dm.v1.IToastButtonV2|null);
                    }

                    /** Represents a ToastV2. */
                    class ToastV2 implements IToastV2 {

                        /**
                         * Constructs a new ToastV2.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IToastV2);

                        /** ToastV2 text. */
                        public text: string;

                        /** ToastV2 duration. */
                        public duration: number;

                        /** ToastV2 toastButtonV2. */
                        public toastButtonV2?: (bilibili.community.service.dm.v1.IToastButtonV2|null);

                        /**
                         * Encodes the specified ToastV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.ToastV2.verify|verify} messages.
                         * @param message ToastV2 message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IToastV2, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ToastV2 message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ToastV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.ToastV2;

                        /**
                         * Gets the default type url for ToastV2
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a BubbleV2. */
                    interface IBubbleV2 {

                        /** BubbleV2 text */
                        text?: (string|null);

                        /** BubbleV2 url */
                        url?: (string|null);

                        /** BubbleV2 bubbleType */
                        bubbleType?: (bilibili.community.service.dm.v1.BubbleType|null);

                        /** BubbleV2 exposureOnce */
                        exposureOnce?: (boolean|null);

                        /** BubbleV2 exposureType */
                        exposureType?: (bilibili.community.service.dm.v1.ExposureType|null);
                    }

                    /** Represents a BubbleV2. */
                    class BubbleV2 implements IBubbleV2 {

                        /**
                         * Constructs a new BubbleV2.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IBubbleV2);

                        /** BubbleV2 text. */
                        public text: string;

                        /** BubbleV2 url. */
                        public url: string;

                        /** BubbleV2 bubbleType. */
                        public bubbleType: bilibili.community.service.dm.v1.BubbleType;

                        /** BubbleV2 exposureOnce. */
                        public exposureOnce: boolean;

                        /** BubbleV2 exposureType. */
                        public exposureType: bilibili.community.service.dm.v1.ExposureType;

                        /**
                         * Encodes the specified BubbleV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.BubbleV2.verify|verify} messages.
                         * @param message BubbleV2 message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IBubbleV2, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a BubbleV2 message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns BubbleV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.BubbleV2;

                        /**
                         * Gets the default type url for BubbleV2
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** BubbleType enum. */
                    enum BubbleType {
                        BubbleTypeNone = 0,
                        BubbleTypeClickButton = 1,
                        BubbleTypeDmSettingPanel = 2
                    }

                    /** Properties of a LabelV2. */
                    interface ILabelV2 {

                        /** LabelV2 title */
                        title?: (string|null);

                        /** LabelV2 content */
                        content?: (string[]|null);

                        /** LabelV2 exposureOnce */
                        exposureOnce?: (boolean|null);

                        /** LabelV2 exposureType */
                        exposureType?: (bilibili.community.service.dm.v1.ExposureType|null);
                    }

                    /** Represents a LabelV2. */
                    class LabelV2 implements ILabelV2 {

                        /**
                         * Constructs a new LabelV2.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.ILabelV2);

                        /** LabelV2 title. */
                        public title: string;

                        /** LabelV2 content. */
                        public content: string[];

                        /** LabelV2 exposureOnce. */
                        public exposureOnce: boolean;

                        /** LabelV2 exposureType. */
                        public exposureType: bilibili.community.service.dm.v1.ExposureType;

                        /**
                         * Encodes the specified LabelV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.LabelV2.verify|verify} messages.
                         * @param message LabelV2 message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.ILabelV2, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a LabelV2 message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns LabelV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.LabelV2;

                        /**
                         * Gets the default type url for LabelV2
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** ExposureType enum. */
                    enum ExposureType {
                        ExposureTypeNone = 0,
                        ExposureTypeDMSend = 1
                    }

                    /** Properties of a ToastButtonV2. */
                    interface IToastButtonV2 {

                        /** ToastButtonV2 text */
                        text?: (string|null);

                        /** ToastButtonV2 action */
                        action?: (bilibili.community.service.dm.v1.ToastFunctionType|null);
                    }

                    /** Represents a ToastButtonV2. */
                    class ToastButtonV2 implements IToastButtonV2 {

                        /**
                         * Constructs a new ToastButtonV2.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IToastButtonV2);

                        /** ToastButtonV2 text. */
                        public text: string;

                        /** ToastButtonV2 action. */
                        public action: bilibili.community.service.dm.v1.ToastFunctionType;

                        /**
                         * Encodes the specified ToastButtonV2 message. Does not implicitly {@link bilibili.community.service.dm.v1.ToastButtonV2.verify|verify} messages.
                         * @param message ToastButtonV2 message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IToastButtonV2, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ToastButtonV2 message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ToastButtonV2
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.ToastButtonV2;

                        /**
                         * Gets the default type url for ToastButtonV2
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a Button. */
                    interface IButton {

                        /** Button text */
                        text?: (string|null);

                        /** Button action */
                        action?: (bilibili.community.service.dm.v1.ToastFunctionType|null);
                    }

                    /** Represents a Button. */
                    class Button implements IButton {

                        /**
                         * Constructs a new Button.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IButton);

                        /** Button text. */
                        public text: string;

                        /** Button action. */
                        public action: bilibili.community.service.dm.v1.ToastFunctionType;

                        /**
                         * Encodes the specified Button message. Does not implicitly {@link bilibili.community.service.dm.v1.Button.verify|verify} messages.
                         * @param message Button message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IButton, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Button message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Button
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.Button;

                        /**
                         * Gets the default type url for Button
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** ToastFunctionType enum. */
                    enum ToastFunctionType {
                        ToastFunctionTypeNone = 0,
                        ToastFunctionTypePostPanel = 1
                    }

                    /** ToastBizType enum. */
                    enum ToastBizType {
                        ToastBizTypeNone = 0,
                        ToastBizTypeEncourage = 1
                    }

                    /** Properties of a CommandDm. */
                    interface ICommandDm {

                        /** CommandDm oid */
                        oid?: (number|null);

                        /** CommandDm mid */
                        mid?: (number|null);

                        /** CommandDm command */
                        command?: (string|null);

                        /** CommandDm text */
                        text?: (string|null);

                        /** CommandDm stime */
                        stime?: (number|null);

                        /** CommandDm ctime */
                        ctime?: (string|null);

                        /** CommandDm mtime */
                        mtime?: (string|null);

                        /** CommandDm extra */
                        extra?: (string|null);

                        /** CommandDm dmid */
                        dmid?: (string|null);
                    }

                    /** Represents a CommandDm. */
                    class CommandDm implements ICommandDm {

                        /**
                         * Constructs a new CommandDm.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.ICommandDm);

                        /** CommandDm oid. */
                        public oid: number;

                        /** CommandDm mid. */
                        public mid: number;

                        /** CommandDm command. */
                        public command: string;

                        /** CommandDm text. */
                        public text: string;

                        /** CommandDm stime. */
                        public stime: number;

                        /** CommandDm ctime. */
                        public ctime: string;

                        /** CommandDm mtime. */
                        public mtime: string;

                        /** CommandDm extra. */
                        public extra: string;

                        /** CommandDm dmid. */
                        public dmid: string;

                        /**
                         * Encodes the specified CommandDm message. Does not implicitly {@link bilibili.community.service.dm.v1.CommandDm.verify|verify} messages.
                         * @param message CommandDm message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.ICommandDm, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a CommandDm message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns CommandDm
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.CommandDm;

                        /**
                         * Gets the default type url for CommandDm
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a DmSegConfig. */
                    interface IDmSegConfig {

                        /** DmSegConfig pageSize */
                        pageSize?: (number|null);

                        /** DmSegConfig total */
                        total?: (number|null);
                    }

                    /** Represents a DmSegConfig. */
                    class DmSegConfig implements IDmSegConfig {

                        /**
                         * Constructs a new DmSegConfig.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDmSegConfig);

                        /** DmSegConfig pageSize. */
                        public pageSize: number;

                        /** DmSegConfig total. */
                        public total: number;

                        /**
                         * Encodes the specified DmSegConfig message. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegConfig.verify|verify} messages.
                         * @param message DmSegConfig message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDmSegConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DmSegConfig message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DmSegConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DmSegConfig;

                        /**
                         * Gets the default type url for DmSegConfig
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a DanmakuFlagConfig. */
                    interface IDanmakuFlagConfig {

                        /** DanmakuFlagConfig recFlag */
                        recFlag?: (number|null);

                        /** DanmakuFlagConfig recText */
                        recText?: (string|null);

                        /** DanmakuFlagConfig recSwitch */
                        recSwitch?: (number|null);
                    }

                    /** Represents a DanmakuFlagConfig. */
                    class DanmakuFlagConfig implements IDanmakuFlagConfig {

                        /**
                         * Constructs a new DanmakuFlagConfig.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDanmakuFlagConfig);

                        /** DanmakuFlagConfig recFlag. */
                        public recFlag: number;

                        /** DanmakuFlagConfig recText. */
                        public recText: string;

                        /** DanmakuFlagConfig recSwitch. */
                        public recSwitch: number;

                        /**
                         * Encodes the specified DanmakuFlagConfig message. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuFlagConfig.verify|verify} messages.
                         * @param message DanmakuFlagConfig message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDanmakuFlagConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DanmakuFlagConfig message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DanmakuFlagConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DanmakuFlagConfig;

                        /**
                         * Gets the default type url for DanmakuFlagConfig
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a DmSegMobileReply. */
                    interface IDmSegMobileReply {

                        /** DmSegMobileReply elems */
                        elems?: (bilibili.community.service.dm.v1.IDanmakuElem[]|null);

                        /** DmSegMobileReply colorfulSrc */
                        colorfulSrc?: (bilibili.community.service.dm.v1.IDmColorful[]|null);
                    }

                    /** Represents a DmSegMobileReply. */
                    class DmSegMobileReply implements IDmSegMobileReply {

                        /**
                         * Constructs a new DmSegMobileReply.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDmSegMobileReply);

                        /** DmSegMobileReply elems. */
                        public elems: bilibili.community.service.dm.v1.IDanmakuElem[];

                        /** DmSegMobileReply colorfulSrc. */
                        public colorfulSrc: bilibili.community.service.dm.v1.IDmColorful[];

                        /**
                         * Encodes the specified DmSegMobileReply message. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegMobileReply.verify|verify} messages.
                         * @param message DmSegMobileReply message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDmSegMobileReply, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DmSegMobileReply message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DmSegMobileReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DmSegMobileReply;

                        /**
                         * Gets the default type url for DmSegMobileReply
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a DanmakuElem. */
                    interface IDanmakuElem {

                        /** DanmakuElem stime */
                        stime?: (number|null);

                        /** DanmakuElem mode */
                        mode?: (number|null);

                        /** DanmakuElem size */
                        size?: (number|null);

                        /** DanmakuElem color */
                        color?: (number|null);

                        /** DanmakuElem uhash */
                        uhash?: (string|null);

                        /** DanmakuElem text */
                        text?: (string|null);

                        /** DanmakuElem date */
                        date?: (number|null);

                        /** DanmakuElem weight */
                        weight?: (number|null);

                        /** DanmakuElem action */
                        action?: (string|null);

                        /** DanmakuElem pool */
                        pool?: (number|null);

                        /** DanmakuElem dmid */
                        dmid?: (string|null);

                        /** DanmakuElem attr */
                        attr?: (number|null);

                        /** DanmakuElem likeCount */
                        likeCount?: (number|null);

                        /** DanmakuElem animation */
                        animation?: (string|null);

                        /** DanmakuElem colorful */
                        colorful?: (bilibili.community.service.dm.v1.DmColorfulType|null);

                        /** DanmakuElem oid */
                        oid?: (number|null);

                        /** DanmakuElem dmFrom */
                        dmFrom?: (bilibili.community.service.dm.v1.DmFromType|null);
                    }

                    /** Represents a DanmakuElem. */
                    class DanmakuElem implements IDanmakuElem {

                        /**
                         * Constructs a new DanmakuElem.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDanmakuElem);

                        /** DanmakuElem stime. */
                        public stime: number;

                        /** DanmakuElem mode. */
                        public mode: number;

                        /** DanmakuElem size. */
                        public size: number;

                        /** DanmakuElem color. */
                        public color: number;

                        /** DanmakuElem uhash. */
                        public uhash: string;

                        /** DanmakuElem text. */
                        public text: string;

                        /** DanmakuElem date. */
                        public date: number;

                        /** DanmakuElem weight. */
                        public weight: number;

                        /** DanmakuElem action. */
                        public action: string;

                        /** DanmakuElem pool. */
                        public pool: number;

                        /** DanmakuElem dmid. */
                        public dmid: string;

                        /** DanmakuElem attr. */
                        public attr: number;

                        /** DanmakuElem likeCount. */
                        public likeCount: number;

                        /** DanmakuElem animation. */
                        public animation: string;

                        /** DanmakuElem colorful. */
                        public colorful: bilibili.community.service.dm.v1.DmColorfulType;

                        /** DanmakuElem oid. */
                        public oid: number;

                        /** DanmakuElem dmFrom. */
                        public dmFrom: bilibili.community.service.dm.v1.DmFromType;

                        /**
                         * Encodes the specified DanmakuElem message. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuElem.verify|verify} messages.
                         * @param message DanmakuElem message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDanmakuElem, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DanmakuElem message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DanmakuElem
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DanmakuElem;

                        /**
                         * Gets the default type url for DanmakuElem
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** DmFromType enum. */
                    enum DmFromType {
                        DmFromUnknown = 0,
                        DmFromNormal = 1,
                        DmFromCmd = 2,
                        DmFromLive = 3
                    }

                    /** Properties of a DanmuWebPlayerConfig. */
                    interface IDanmuWebPlayerConfig {

                        /** DanmuWebPlayerConfig dmSwitch */
                        dmSwitch?: (boolean|null);

                        /** DanmuWebPlayerConfig aiSwitch */
                        aiSwitch?: (boolean|null);

                        /** DanmuWebPlayerConfig aiLevel */
                        aiLevel?: (number|null);

                        /** DanmuWebPlayerConfig typeTop */
                        typeTop?: (boolean|null);

                        /** DanmuWebPlayerConfig typeScroll */
                        typeScroll?: (boolean|null);

                        /** DanmuWebPlayerConfig typeBottom */
                        typeBottom?: (boolean|null);

                        /** DanmuWebPlayerConfig typeColor */
                        typeColor?: (boolean|null);

                        /** DanmuWebPlayerConfig typeSpecial */
                        typeSpecial?: (boolean|null);

                        /** DanmuWebPlayerConfig preventshade */
                        preventshade?: (boolean|null);

                        /** DanmuWebPlayerConfig dmask */
                        dmask?: (boolean|null);

                        /** DanmuWebPlayerConfig opacity */
                        opacity?: (number|null);

                        /** DanmuWebPlayerConfig speedplus */
                        speedplus?: (number|null);

                        /** DanmuWebPlayerConfig fontsize */
                        fontsize?: (number|null);

                        /** DanmuWebPlayerConfig fullscreensync */
                        fullscreensync?: (boolean|null);

                        /** DanmuWebPlayerConfig speedsync */
                        speedsync?: (boolean|null);

                        /** DanmuWebPlayerConfig fontfamily */
                        fontfamily?: (string|null);

                        /** DanmuWebPlayerConfig bold */
                        bold?: (boolean|null);

                        /** DanmuWebPlayerConfig fontborder */
                        fontborder?: (number|null);

                        /** DanmuWebPlayerConfig seniorModeSwitch */
                        seniorModeSwitch?: (number|null);

                        /** DanmuWebPlayerConfig typeTopBottom */
                        typeTopBottom?: (boolean|null);

                        /** DanmuWebPlayerConfig dmarea */
                        dmarea?: (number|null);

                        /** DanmuWebPlayerConfig dmdensity */
                        dmdensity?: (number|null);
                    }

                    /** Represents a DanmuWebPlayerConfig. */
                    class DanmuWebPlayerConfig implements IDanmuWebPlayerConfig {

                        /**
                         * Constructs a new DanmuWebPlayerConfig.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDanmuWebPlayerConfig);

                        /** DanmuWebPlayerConfig dmSwitch. */
                        public dmSwitch: boolean;

                        /** DanmuWebPlayerConfig aiSwitch. */
                        public aiSwitch: boolean;

                        /** DanmuWebPlayerConfig aiLevel. */
                        public aiLevel: number;

                        /** DanmuWebPlayerConfig typeTop. */
                        public typeTop: boolean;

                        /** DanmuWebPlayerConfig typeScroll. */
                        public typeScroll: boolean;

                        /** DanmuWebPlayerConfig typeBottom. */
                        public typeBottom: boolean;

                        /** DanmuWebPlayerConfig typeColor. */
                        public typeColor: boolean;

                        /** DanmuWebPlayerConfig typeSpecial. */
                        public typeSpecial: boolean;

                        /** DanmuWebPlayerConfig preventshade. */
                        public preventshade: boolean;

                        /** DanmuWebPlayerConfig dmask. */
                        public dmask: boolean;

                        /** DanmuWebPlayerConfig opacity. */
                        public opacity: number;

                        /** DanmuWebPlayerConfig speedplus. */
                        public speedplus: number;

                        /** DanmuWebPlayerConfig fontsize. */
                        public fontsize: number;

                        /** DanmuWebPlayerConfig fullscreensync. */
                        public fullscreensync: boolean;

                        /** DanmuWebPlayerConfig speedsync. */
                        public speedsync: boolean;

                        /** DanmuWebPlayerConfig fontfamily. */
                        public fontfamily: string;

                        /** DanmuWebPlayerConfig bold. */
                        public bold: boolean;

                        /** DanmuWebPlayerConfig fontborder. */
                        public fontborder: number;

                        /** DanmuWebPlayerConfig seniorModeSwitch. */
                        public seniorModeSwitch: number;

                        /** DanmuWebPlayerConfig typeTopBottom. */
                        public typeTopBottom: boolean;

                        /** DanmuWebPlayerConfig dmarea. */
                        public dmarea: number;

                        /** DanmuWebPlayerConfig dmdensity. */
                        public dmdensity: number;

                        /**
                         * Encodes the specified DanmuWebPlayerConfig message. Does not implicitly {@link bilibili.community.service.dm.v1.DanmuWebPlayerConfig.verify|verify} messages.
                         * @param message DanmuWebPlayerConfig message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDanmuWebPlayerConfig, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DanmuWebPlayerConfig message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DanmuWebPlayerConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DanmuWebPlayerConfig;

                        /**
                         * Gets the default type url for DanmuWebPlayerConfig
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of an Expressions. */
                    interface IExpressions {

                        /** Expressions data */
                        data?: (bilibili.community.service.dm.v1.IExpression[]|null);
                    }

                    /** Represents an Expressions. */
                    class Expressions implements IExpressions {

                        /**
                         * Constructs a new Expressions.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IExpressions);

                        /** Expressions data. */
                        public data: bilibili.community.service.dm.v1.IExpression[];

                        /**
                         * Encodes the specified Expressions message. Does not implicitly {@link bilibili.community.service.dm.v1.Expressions.verify|verify} messages.
                         * @param message Expressions message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IExpressions, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an Expressions message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Expressions
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.Expressions;

                        /**
                         * Gets the default type url for Expressions
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of an Expression. */
                    interface IExpression {

                        /** Expression keyword */
                        keyword?: (string[]|null);

                        /** Expression url */
                        url?: (string|null);

                        /** Expression period */
                        period?: (bilibili.community.service.dm.v1.IPeriod[]|null);
                    }

                    /** Represents an Expression. */
                    class Expression implements IExpression {

                        /**
                         * Constructs a new Expression.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IExpression);

                        /** Expression keyword. */
                        public keyword: string[];

                        /** Expression url. */
                        public url: string;

                        /** Expression period. */
                        public period: bilibili.community.service.dm.v1.IPeriod[];

                        /**
                         * Encodes the specified Expression message. Does not implicitly {@link bilibili.community.service.dm.v1.Expression.verify|verify} messages.
                         * @param message Expression message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IExpression, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an Expression message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Expression
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.Expression;

                        /**
                         * Gets the default type url for Expression
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a Period. */
                    interface IPeriod {

                        /** Period start */
                        start?: (number|null);

                        /** Period end */
                        end?: (number|null);
                    }

                    /** Represents a Period. */
                    class Period implements IPeriod {

                        /**
                         * Constructs a new Period.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IPeriod);

                        /** Period start. */
                        public start: number;

                        /** Period end. */
                        public end: number;

                        /**
                         * Encodes the specified Period message. Does not implicitly {@link bilibili.community.service.dm.v1.Period.verify|verify} messages.
                         * @param message Period message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IPeriod, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Period message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Period
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.Period;

                        /**
                         * Gets the default type url for Period
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of an AnyBody. */
                    interface IAnyBody {

                        /** AnyBody body */
                        body?: (google.protobuf.IAny|null);
                    }

                    /** Represents an AnyBody. */
                    class AnyBody implements IAnyBody {

                        /**
                         * Constructs a new AnyBody.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IAnyBody);

                        /** AnyBody body. */
                        public body?: (google.protobuf.IAny|null);

                        /**
                         * Encodes the specified AnyBody message. Does not implicitly {@link bilibili.community.service.dm.v1.AnyBody.verify|verify} messages.
                         * @param message AnyBody message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IAnyBody, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an AnyBody message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns AnyBody
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.AnyBody;

                        /**
                         * Gets the default type url for AnyBody
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a DmColorful. */
                    interface IDmColorful {

                        /** DmColorful type */
                        type?: (bilibili.community.service.dm.v1.DmColorfulType|null);

                        /** DmColorful src */
                        src?: (string|null);
                    }

                    /** Represents a DmColorful. */
                    class DmColorful implements IDmColorful {

                        /**
                         * Constructs a new DmColorful.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDmColorful);

                        /** DmColorful type. */
                        public type: bilibili.community.service.dm.v1.DmColorfulType;

                        /** DmColorful src. */
                        public src: string;

                        /**
                         * Encodes the specified DmColorful message. Does not implicitly {@link bilibili.community.service.dm.v1.DmColorful.verify|verify} messages.
                         * @param message DmColorful message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDmColorful, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DmColorful message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DmColorful
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DmColorful;

                        /**
                         * Gets the default type url for DmColorful
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** DmColorfulType enum. */
                    enum DmColorfulType {
                        NoneType = 0,
                        VipGradualColor = 60001
                    }

                    /** Properties of a DmSubView. */
                    interface IDmSubView {

                        /** DmSubView type */
                        type?: (number|null);

                        /** DmSubView oid */
                        oid?: (number|null);

                        /** DmSubView pid */
                        pid?: (number|null);

                        /** DmSubView postPanel_2 */
                        postPanel_2?: (bilibili.community.service.dm.v1.IPostPanelV2[]|null);
                    }

                    /** Represents a DmSubView. */
                    class DmSubView implements IDmSubView {

                        /**
                         * Constructs a new DmSubView.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: bilibili.community.service.dm.v1.IDmSubView);

                        /** DmSubView type. */
                        public type: number;

                        /** DmSubView oid. */
                        public oid: number;

                        /** DmSubView pid. */
                        public pid: number;

                        /** DmSubView postPanel_2. */
                        public postPanel_2: bilibili.community.service.dm.v1.IPostPanelV2[];

                        /**
                         * Encodes the specified DmSubView message. Does not implicitly {@link bilibili.community.service.dm.v1.DmSubView.verify|verify} messages.
                         * @param message DmSubView message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: bilibili.community.service.dm.v1.IDmSubView, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DmSubView message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DmSubView
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bilibili.community.service.dm.v1.DmSubView;

                        /**
                         * Gets the default type url for DmSubView
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }
                }
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Gets the default type url for Any
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
