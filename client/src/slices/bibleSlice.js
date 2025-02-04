import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBook: null,
  selectedChapter: null,
  selectedVerse: null,
};

const bibleSlice = createSlice({
  name: 'bible',
  initialState,
  reducers: {
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
      state.selectedChapter = null; // Reseta o capítulo e o versículo quando um novo livro é selecionado
      state.selectedVerse = null;
    },
    setSelectedChapter: (state, action) => {
      state.selectedChapter = action.payload;
      state.selectedVerse = null; // Reseta o versículo quando um novo capítulo é selecionado
    },
    setSelectedVerse: (state, action) => {
      state.selectedVerse = action.payload;
    },
    navigateVerse: (state, action) => {
      const { direction, bibleData } = action.payload;
      const { selectedBook, selectedChapter, selectedVerse } = state;

      // Encontrar o índice atual do versículo e fazer a navegação.
      const chapterData = bibleData[selectedBook]?.find(
        (chapter) => chapter.chapter === selectedChapter.chapter
      );

      if (chapterData) {
        const totalVerses = chapterData.verses;

        if (direction === 'next' && selectedVerse < totalVerses) 
          state.selectedVerse += 1;
        else if (direction === 'prev' && selectedVerse > 1)
          state.selectedVerse -= 1;
      }
    },
  },
});

export const { setSelectedBook, setSelectedChapter, setSelectedVerse, navigateVerse } = bibleSlice.actions;

export default bibleSlice.reducer;
