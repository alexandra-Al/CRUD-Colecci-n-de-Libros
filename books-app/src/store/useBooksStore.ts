// src/stores/books.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export interface Book {
  id?: number
  title: string
  author: string
  year: number
  genre: string
  price: number
}

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [] as Book[],
    isLoading: false,
    error: null as string | null
  }),
  actions: {
    async fetchBooks() {
      this.isLoading = true
      this.error = null
      try {
        const res = await axios.get<Book[]>('http://localhost:3000/books')
        this.books = res.data
      } catch (error: any) {
        this.error = 'Error al cargar libros'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async addBook(book: Book) {
      try {
        const res = await axios.post<Book>('http://localhost:3000/books', book)
        this.books.push(res.data)
      } catch (error: any) {
        console.error('Error al agregar libro:', error)
      }
    },

    async updateBook(id: number, book: Book) {
      try {
        const res = await axios.put<Book>(`http://localhost:3000/books/${id}`, book)
        const index = this.books.findIndex(b => b.id === id)
        if (index !== -1) {
          this.books[index] = res.data
        }
      } catch (error: any) {
        console.error('Error al actualizar libro:', error)
      }
    },

    async deleteBook(id: number) {
      try {
        await axios.delete(`http://localhost:3000/books/${id}`)
        this.books = this.books.filter(book => book.id !== id)
      } catch (error: any) {
        console.error('Error al eliminar libro:', error)
      }
    },

    async getBookById(id: number): Promise<Book | undefined> {
      try {
        const res = await axios.get<Book>(`http://localhost:3000/books/${id}`)
        return res.data
      } catch (error: any) {
        console.error('Error al obtener libro por ID:', error)
        return undefined
      }
    }
  }
})
