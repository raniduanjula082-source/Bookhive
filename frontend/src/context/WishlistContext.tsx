import { createContext, useState, useEffect, type ReactNode } from 'react';

export interface WishlistItem {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    // We might need few more fields if we want to add to cart directly from wishlist
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
}

export const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    isInWishlist: () => false,
});

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlist(prev => {
            if (prev.find(i => i.id === item.id)) return prev;
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: string) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const isInWishlist = (id: string) => {
        return wishlist.some(item => item.id === id);
    }

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
