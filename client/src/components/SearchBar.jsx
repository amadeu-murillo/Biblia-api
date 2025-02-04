import React, { useState } from 'react';
import bible from '../data/bible.json';
import './css/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTermVersiculo, setSearchTermVersiculo] = useState('');
    const [searchTermLivro, setSearchTermLivro] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Gerar lista de livros a partir do JSON
    const booksList = Object.entries(bible).flatMap(([testament, books]) =>
        Object.entries(books).map(([key, bookData]) => ({
            key, // Chave do livro (ex: "GEN")
            name: bookData.name, // Nome do livro (ex: "Gênesis")
            chapters: bookData.chapters, // Capítulos com seus versículos
        }))
    );

    const handleInputChange = (e) => {
        setSearchTermVersiculo(e.target.value);
        setErrorMessage('');
    };

    const handleSelectChange = (e) => {
        setSearchTermLivro(e.target.value);
        setErrorMessage('');
    };

    const validateInput = () => {
        if (!searchTermLivro) {
            setErrorMessage('Por favor, selecione um livro.');
            return false;
        }

        if (!searchTermVersiculo.match(/^\d+:\d+$/)) {
            setErrorMessage('Formato inválido. Use o formato Capítulo:Versículo (ex: 3:16).');
            return false;
        }

        const [chapter, verse] = searchTermVersiculo.split(':').map(Number);
        const selectedBook = booksList.find(book => book.key === searchTermLivro);

        if (!selectedBook || !selectedBook.chapters[chapter - 1]) {
            setErrorMessage('Capítulo não encontrado no livro selecionado.');
            return false;
        }

        if (verse < 1 || verse > selectedBook.chapters[chapter - 1].verses) {
            setErrorMessage('Versículo fora do intervalo válido.');
            return false;
        }

        return true;
    };

    const handleSearchClick = () => {
        if (validateInput()) {
            const searchQuery = `${searchTermLivro} ${searchTermVersiculo}`;
            onSearch(searchQuery);
        }
    };

    const handleRandomClick = () => {
        const randomBook = booksList[Math.floor(Math.random() * booksList.length)];
        const randomChapterIndex = Math.floor(Math.random() * randomBook.chapters.length);
        const randomChapter = randomBook.chapters[randomChapterIndex];
        const randomVerse = Math.ceil(Math.random() * randomChapter.verses);

        setSearchTermLivro(randomBook.key);
        setSearchTermVersiculo(`${randomChapter.chapter}:${randomVerse}`);
        onSearch(`${randomBook.key} ${randomChapter.chapter}:${randomVerse}`);
        setErrorMessage('');
    };

    return (
        <div className="search-bar">
            <header className="search-bar__header">
                <h1 className="search-bar__title">Mensagem do Dia</h1>
                <p className="search-bar__subtitle">Escolha um livro e busque um versículo ou gere aleatoriamente uma mensagem de Deus para você!</p>
            </header>

            <div className="search-bar__form">
                <div className="search-bar__group">
                    <label htmlFor="livros" className="search-bar__label">Selecione um livro:</label>
                    <select 
                        id="livros" 
                        name="livros" 
                        onChange={handleSelectChange}
                        value={searchTermLivro}
                        className="search-bar__select"
                    >
                        <option value="" disabled>Escolha um livro</option>
                        {booksList.map(book => (
                            <option key={book.key} value={book.key}>
                                {book.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="search-bar__group">
                    <label htmlFor="versiculo" className="search-bar__label">Versículo:</label>
                    <input
                        id="versiculo"
                        type="text"
                        value={searchTermVersiculo}
                        onChange={handleInputChange}
                        placeholder="Ex: 3:16 (Capítulo:Versículo)"
                        className="search-bar__input"
                    />
                </div>

                {errorMessage && <p className="search-bar__error">{errorMessage}</p>}

                <div className="search-bar__actions">
                    <button
                        className="search-bar__button"
                        onClick={handleSearchClick}
                    >
                        Buscar
                    </button>

                    <button
                        className="search-bar__button search-bar__button--secondary"
                        onClick={handleRandomClick}
                    >
                        Aleatório
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
