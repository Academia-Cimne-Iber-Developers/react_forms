import { useState, useEffect } from "react";

export default function ArticleForm() {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [articleData, setArticleData] = useState({ title: "", content: "" });
    const [submitting, setSubmitting] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        setLoadingCategories(true);
        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/categories`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Error al realizar la petición al endpoint"
                    );
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories", error);
            })
            .finally(() => {
                setLoadingCategories(false);
            });
    }, []);

    const handleInputChange = (event) => {
        setArticleData({
            ...articleData,
            [event.target.name]: event.target.value,
        });
    };

    const handleCategoryChange = (event) => {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const updatedSelectedCategories = categories.filter((cat) =>
            selectedOptions.includes(String(cat.id))
        );
        setSelectedCategories(updatedSelectedCategories);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!submitting || !loadingCategories) {
            setSubmitting(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
                },
                body: JSON.stringify(articleData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            "Error al realizar la petición al endpoint"
                        );
                    }
                    return response.json();
                })
                .then((article) => {
                    selectedCategories.forEach((category) => {
                        fetch(
                            `${
                                import.meta.env.VITE_API_BASE_URL
                            }infosphere/article-categories/`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${
                                        import.meta.env.VITE_API_TOKEN
                                    }`,
                                },
                                body: JSON.stringify({
                                    article: article.id,
                                    category: category.id,
                                }),
                            }
                        );
                    });
                })
                .catch((error) => {
                    console.error("Error creating article", error);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    return (
        <form className="box m-4 p-4" onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Título</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="title"
                        value={articleData.title}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Contenido</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        type="text"
                        name="content"
                        value={articleData.content}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Categorías</label>
                <div className="select is-fullwidth is-multiple">
                    <select
                        multiple
                        size="5"
                        value={selectedCategories.map((cat) => cat.id)}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-primary"
                        type="submit"
                        disabled={submitting || loadingCategories}
                    >
                        Crear Artículo
                    </button>
                </div>
            </div>
        </form>
    );
}
