import { ThemePicker, useTheme } from "@teishi/bulma_theme";
import ArticleForm from "./components/ArticleForm";

function App() {
    const { primary, secondary } = useTheme("state");

    return (
        <div className={`box has-background-${secondary}`}>
            <ArticleForm />
        </div>
    );
}

export default App;
