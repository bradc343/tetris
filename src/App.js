import React, { useState } from 'react'
import logo from './logo.svg';
import tetris from './tetris.png'
import './App.css';
import Table from './Table';

const App = () => {
	const [inputs, setInputs] = useState([]);
	const [outputs, setOutputs] = useState([]);
	const statePieces = {
		Q: [[1, 1], [1, 1]],
		Z: [[0, 1, 1], [1, 1, 0]],
		S: [[1, 1, 0], [0, 1, 1]],
		T: [[0, 1, 0], [1, 1, 1]],
		I: [[1, 1, 1, 1]],
		L: [[1, 1], [1, 0], [1, 0]],
		J: [[1, 1], [0, 1], [0, 1]]
	}

	const grabFile = async (e) => {
		console.log(e.target.files[0])

		var r = new FileReader();
		r.onload = function (e) {
			var contents = e.target.result;
			var lines = contents.split('\n');
			lines = lines.filter(string => string.length > 0)
			setInputs(lines)
			let resultArray = []
			for (var i = 0; i < lines.length; i++) {
				var recordLines = []
				var newLine = lines[i].split(',')
				console.log(newLine)
				for (var j = 0; j < newLine.length; j++) {
					let start = parseInt(newLine[j][1], 10)
					let piece = statePieces[newLine[j][0]]

					if (j === 0) {
						for (var h = 0; h < piece.length; h++) {
							let tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
							for (var t = 0; t < piece[h].length; t++) {
								tempArray[start + t] = piece[h][t]
							}
							recordLines.push(tempArray)
						}
					} else {
						let clear = true
						for (var gg = recordLines.length - 1; gg > 0; gg--) {
							let mainLine = recordLines[gg].slice(start, (start + piece[0].length))
							if (mainLine.includes(1)) {
								clear = false
								break;
							}
						}
						if (clear) {
							let rewriteLine = recordLines[0]
							for (t = 0; t < piece[0].length; t++) {
								rewriteLine[start + t] = piece[0][t]
							}
							recordLines[0] = rewriteLine
						} else {
							for (h = 0; h < piece.length; h++) {
								let tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
								let addLine = false
								for (var v = 0; v < piece[h].length; v++) {
									if (h === 0) {
										let tempLine = recordLines[recordLines.length - 1]
										let newLine = false
										if (tempLine[start + v] === 1 && piece[0][v] === 1) {
											newLine = true
											let tempArray1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
											for (var ty = 0; ty < piece[h].length; ty++) {
												tempArray1[start + ty] = piece[h][ty]
											}
											recordLines.push(tempArray1)
											break
										} else if (!newLine && tempLine[start + v] === 0 && piece[0][v] === 1) {
											tempLine[start + v] = piece[0][v]
										} else {
											recordLines[recordLines.length - 1] = tempLine
										}
									} else {
										addLine = true
										tempArray[start + v] = piece[h][v]
									}
								}
								if (addLine) {
									recordLines.push(tempArray)
								}
							}
							// for delete row
							let tempRecordArray = []
							for (var kk = 0; kk < recordLines.length; kk++) {
								if (recordLines[kk].includes(0)) {
									tempRecordArray.push(recordLines[kk])
								}
							}
							recordLines = tempRecordArray
						}
					}

				}
				resultArray.push(recordLines)
			}
			var heights = []
			for (var xx = 0; xx < resultArray.length; xx++){
				heights.push(resultArray[xx].length)
			}
			setOutputs(heights)
		}
		r.readAsText(e.target.files[0]);

	}

	return (
		<div className="App">
			<header className="App-header">
				<div className='images'>
					<img src={logo} className="App-logo" alt="logo" />
					<span className='imageSpan'>+</span>
					<div>
						<img src={tetris} className='tetrisImage' alt="tetris" />
					</div>
				</div>
				<div>
					<label htmlFor="upload" className="fileColor">
						<div className="button">Attach Tetris File</div>
					</label>
					<input className='upload' id="upload" type="file" accept=".txt" onChange={(e) => grabFile(e)} />
				</div>
			</header>
			<div className='lists'>
				<div>
					<Table
						rows={inputs}
						title='Inputs'
					/>
				</div>
				<div>
					<Table
						rows={outputs}
						title='Outputs'
					/>
				</div>
			</div>
		</div>
	);

}

export default App;
