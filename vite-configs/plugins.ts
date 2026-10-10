import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export function plugins() {
  return [
    react(),
    babel({ 
      plugins: [
        ['babel-plugin-react-compiler', {}]
      ] 
    }),
    tailwindcss()
  ]
}
