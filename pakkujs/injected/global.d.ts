interface Window {
    root_elem: HTMLElement;
    danmus: import('../core/types').DanmuObjectRepresentative[];
    danmus_del: import('../core/types').DanmuObject[];

    reload_danmu_magic: (key: int) => void;

    panel_listener: (e: any) => void;

    graph_observer: MutationObserver | null,
    details_observer: MutationObserver | null,
    fluctlight_highlight: ((hltime?: number, fix_position: boolean = false) => void) | null;
}