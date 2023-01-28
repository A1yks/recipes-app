type ImageTypes = 'avatars' | 'recipes' | 'categories';

function getImageUrl(imageName: string, type: ImageTypes) {
    return `${process.env.NEXT_PUBLIC_URL}/static/images/${type}/${imageName}`;
}

export default getImageUrl;
