import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedVerse } from '../slices/bibleSlice';
import { fetchVerses } from '../services/api';
import { Button, Typography, Box } from '@mui/material';
import './css/VerseView.css';

const VerseView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedBook = useSelector((state) => state.bible.selectedBook);
  const selectedChapter = useSelector((state) => state.bible.selectedChapter);
  const selectedVerse = useSelector((state) => state.bible.selectedVerse);

  const [verseContent, setVerseContent] = useState('');

  // Fetch conteúdo do versículo
  useEffect(() => {
    if (selectedBook && selectedChapter && selectedVerse) {
      const searchTerm = `${selectedBook.key} ${selectedChapter.chapter}:${selectedVerse}`;
      fetchVerses(searchTerm).then((data) => {
        setVerseContent(data.text || 'Conteúdo não encontrado.');
      });
    }
  }, [selectedBook, selectedChapter, selectedVerse]);

  if (!selectedBook || !selectedChapter || !selectedVerse) {
    return <Typography>Selecione um versículo na lista para visualizar.</Typography>;
  }

  const isFirstVerse = selectedVerse === 1;
  const isLastVerse = selectedVerse === selectedChapter.verses;

  const handleNextVerse = () => {
    if (!isLastVerse) {
      dispatch(setSelectedVerse(selectedVerse + 1));
    }
  };

  const handlePrevVerse = () => {
    if (!isFirstVerse) {
      dispatch(setSelectedVerse(selectedVerse - 1));
    }
  };

  return (
    <Box className="verse-view-container">
      <Box className="verse-header">
        <Typography variant="h4" component="h1">{selectedBook.name}</Typography> {/* Usando `selectedBook.name` */}
        <Typography variant="h6" component="h2">
          Capítulo {selectedChapter.chapter}, Versículo {selectedVerse}
        </Typography>
      </Box>

      <Box className="verse-content">
        <Typography>{verseContent}</Typography>
      </Box>

      <Box className="button-group">
        {!isFirstVerse && (
          <Button 
            variant="contained" 
            onClick={handlePrevVerse} 
            className="nav-button"
            color="primary"
          >
            Versículo Anterior
          </Button>
        )}
        {!isLastVerse && (
          <Button 
            variant="contained" 
            onClick={handleNextVerse} 
            className="nav-button"
            color="primary"
          >
            Próximo Versículo
          </Button>
        )}
      </Box>

      <Button 
        variant="outlined" 
        onClick={() => navigate('/')} 
        className="back-button"
        color="secondary"
        style={{ marginTop: '20px' }}
      >
        Voltar
      </Button>
    </Box>
  );
};

export default VerseView;
