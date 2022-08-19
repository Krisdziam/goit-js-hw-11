import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const submitBtn = document.querySelector('.js-submit-btn');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
