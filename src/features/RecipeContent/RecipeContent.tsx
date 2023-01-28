import ContentLayout from 'src/layouts/ContentLayout';
import { RecipeContentProps } from './RecipeContent.types';

function RecipeContent(props: RecipeContentProps) {
    return <ContentLayout>Recipe id: {props.recipeId}</ContentLayout>;
}

export default RecipeContent;
