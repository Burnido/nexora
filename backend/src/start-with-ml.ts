import { spawn } from 'child_process'
import path from 'path'

// Start the ML API using uvicorn (assumes Python + uvicorn installed and requirements satisfied)
const mlServiceDir = path.resolve(__dirname, '../../ml-project/ml-service')
console.log('Starting ML API from', mlServiceDir)

const py = process.platform === 'win32' ? 'py' : 'python3'
const args = ['-3', '-m', 'uvicorn', 'predict_api:app', '--host', '127.0.0.1', '--port', '5000']

const ml = spawn(py, args, { cwd: mlServiceDir, stdio: 'inherit' })

ml.on('error', (err) => {
  console.error('Failed to start ML API:', err)
})

ml.on('exit', (code, signal) => {
  console.log(`ML API exited with code ${code} signal ${signal}`)
})

// After spawning ML API, start the backend server by importing the usual index (it will listen)
import('./index')
  .then(() => console.log('Backend started (and ML API launched)'))
  .catch((err) => console.error('Failed to start backend:', err))
