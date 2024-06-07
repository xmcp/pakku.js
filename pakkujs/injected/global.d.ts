interface Window {
    panel_listener: (e: any) => void;
    graph_observer: MutationObserver | null,
    details_observer: MutationObserver | null,
    fluctlight_highlight: ((hltime?: number) => void) | null;
    root_elem: HTMLElement;
    reload_danmu_magic: (key: int) => void;
    danmus: import('../core/types').DanmuObjectRepresentative[];
    danmus_del: import('../core/types').DanmuObject[];
}