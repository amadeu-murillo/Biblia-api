import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBook, setSelectedChapter, setSelectedVerse } from '../slices/bibleSlice';
import bible from '../data/bible.json';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './css/Verses.css';

const Verses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Seleção do estado no Redux
  const selectedBook = useSelector((state) => state.bible.selectedBook);
  const selectedChapter = useSelector((state) => state.bible.selectedChapter);

  // Função para selecionar um livro
  const handleBookSelect = (bookData) => {
    dispatch(setSelectedBook(bookData));
  };

  // Função para selecionar um capítulo
  const handleChapterSelect = (chapter) => {
    dispatch(setSelectedChapter(chapter));
  };

  // Função para selecionar um versículo
  const handleVerseSelect = (verse) => {
    dispatch(setSelectedVerse(verse));
    navigate('/view'); // Redireciona para a visualização do versículo selecionado
  };

  return (
    <div className="verses-container">
      {/* Dropdown para os livros */}
      <div className="testaments">
        {/* Accordion para o Antigo Testamento */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Antigo Testamento</Typography>
          </AccordionSummary>
          <AccordionDetails className="accordion-content">
            {Object.keys(bible['Old Testament']).map((bookKey) => {
              const bookData = bible['Old Testament'][bookKey];
              return (
                <Accordion key={bookKey} className="book-accordion">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleBookSelect(bookData)}>
                    <Typography>{bookData.name}</Typography> {/* Título do livro ajustado */}
                  </AccordionSummary>
                  <AccordionDetails className="accordion-content">
                    {selectedBook?.name === bookData.name && bookData.chapters.map((chapter) => (
                      <Accordion key={chapter.chapter} className="chapter-accordion">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleChapterSelect(chapter)}>
                          <Typography>Capítulo {chapter.chapter}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordion-content">
                          {/* Exibir versículos se um capítulo for selecionado */}
                          {selectedChapter && selectedChapter.chapter === chapter.chapter && (
                            <Grid container spacing={1} className="verses-grid">
                              {[...Array(chapter.verses)].map((_, index) => (
                                <Grid item key={index} xs={3} sm={2} md={1}>
                                  <Paper
                                    className="verse-box"
                                    onClick={() => handleVerseSelect(index + 1)}
                                    elevation={2}
                                  >
                                    {index + 1}
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </AccordionDetails>
        </Accordion>

        {/* Accordion para o Novo Testamento */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Novo Testamento</Typography>
          </AccordionSummary>
          <AccordionDetails className="accordion-content">
            {Object.keys(bible['New Testament']).map((bookKey) => {
              const bookData = bible['New Testament'][bookKey];
              return (
                <Accordion key={bookKey} className="book-accordion">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleBookSelect(bookData)}>
                    <Typography>{bookData.name}</Typography> {/* Título do livro ajustado */}
                  </AccordionSummary>
                  <AccordionDetails className="accordion-content">
                    {selectedBook?.name === bookData.name && bookData.chapters.map((chapter) => (
                      <Accordion key={chapter.chapter} className="chapter-accordion">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleChapterSelect(chapter)}>
                          <Typography>Capítulo {chapter.chapter}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordion-content">
                          {/* Exibir versículos se um capítulo for selecionado */}
                          {selectedChapter && selectedChapter.chapter === chapter.chapter && (
                            <Grid container spacing={1} className="verses-grid">
                              {[...Array(chapter.verses)].map((_, index) => (
                                <Grid item key={index} xs={3} sm={2} md={1}>
                                  <Paper
                                    className="verse-box"
                                    onClick={() => handleVerseSelect(index + 1)}
                                    elevation={2}
                                  >
                                    {index + 1}
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Verses;
