import { create } from "zustand";

interface SidebarState {
    isOpen: boolean;
    isDropdownOpen: boolean;
    isWithdrawDropdownOpen: boolean;
    toggleSidebar: () => void;
    toggleDropdown: () => void;
    toggleWithdrawDropdown: () => void;
    setDropdownOpen: (isOpen: boolean) => void; // Added function to set dropdown state
    setWithdrawDropdownOpen: (isOpen: boolean) => void; // Added function to set withdraw dropdown state
}

const useSidebarStore = create<SidebarState>((set) => ({
    isOpen: false,
    isDropdownOpen: false,
    isWithdrawDropdownOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    toggleDropdown: () =>
        set((state) => ({ isDropdownOpen: !state.isDropdownOpen })),
    toggleWithdrawDropdown: () =>
        set((state) => ({
            isWithdrawDropdownOpen: !state.isWithdrawDropdownOpen,
        })),
    setDropdownOpen: (isOpen: boolean) => set({ isDropdownOpen: isOpen }),
    setWithdrawDropdownOpen: (isOpen: boolean) =>
        set({ isWithdrawDropdownOpen: isOpen }),
}));

export default useSidebarStore;
