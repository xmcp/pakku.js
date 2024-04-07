interface Window {
    panel_listener: (e: any) => void;
    graph_observer: MutationObserver,
    details_observer: MutationObserver,
    fluctlight_highlight: (hltime?: number) => void;
    root_elem: HTMLElement;
    reload_danmu_magic: () => void;
    danmus: import('../core/types').DanmuObjectRepresentative[];
}