export interface ProductColor {
    name: string;
    hex: string;
}

export interface ProductSpecification {
    label: string;
    value: string;
}

export type ProductSize = number | string;

export interface ProductApiResponse {
    id: string;
    name: string;
    slug: string;
    category: string;
    brand: string;

    price: number;
    discountPercent: number;
    discountPrice: number;

    thumbnail: string;
    images: string;

    rating: number;
    reviewsCount: number;

    description: string;

    stock: number;
    isAvailable: boolean;

    createdAt: string;
    soldCount: number;
    viewsCount: number;

    colors: string;
    sizes: string;
    specifications: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    category: string;
    brand: string;

    price: number;
    discountPercent: number;
    discountPrice: number;

    thumbnail: string;
    images: string[];

    rating: number;
    reviewsCount: number;

    description: string;

    stock: number;
    isAvailable: boolean;

    createdAt: string;
    soldCount: number;
    viewsCount: number;

    colors: ProductColor[];
    sizes: ProductSize[];
    specifications: ProductSpecification[];
}

function safeJsonParse<T>(value: string | undefined | null, fallback: T): T {
    if (!value) return fallback;
    try {
        const parsed = JSON.parse(value);
        return parsed ?? fallback;
    } catch {
        return fallback;
    }
}

const DEFAULT_LOCAL_IMAGE_COUNT = 4;

export function getLocalThumbnail(id: string): string {
    return `/images/products/${id}/thumbnail.png`;
}


export function getLocalImages(id: string, count: number = DEFAULT_LOCAL_IMAGE_COUNT): string[] {
    const total = count > 0 ? count : DEFAULT_LOCAL_IMAGE_COUNT;
    return Array.from({ length: total }, (_, i) => `/images/products/${id}/${i + 1}.png`);
}

export function mapProductFromApi(raw: ProductApiResponse): Product {
    const apiImages = safeJsonParse<string[]>(raw.images, []);

    return {
        id: raw.id,
        name: raw.name,
        slug: raw.slug,
        category: raw.category,
        brand: raw.brand,

        price: raw.price,
        discountPercent: raw.discountPercent,
        discountPrice: raw.discountPrice,

        thumbnail: getLocalThumbnail(raw.id),
        images: getLocalImages(raw.id, apiImages.length),

        rating: raw.rating,
        reviewsCount: raw.reviewsCount,

        description: raw.description,

        stock: raw.stock,
        isAvailable: raw.isAvailable,

        createdAt: raw.createdAt,
        soldCount: raw.soldCount,
        viewsCount: raw.viewsCount,

        colors: safeJsonParse<ProductColor[]>(raw.colors, []),
        sizes: safeJsonParse<ProductSize[]>(raw.sizes, []),
        specifications: safeJsonParse<ProductSpecification[]>(raw.specifications, []),
    };
}

export function mapProductsFromApi(raw: ProductApiResponse[]): Product[] {
    return raw.map(mapProductFromApi);
}