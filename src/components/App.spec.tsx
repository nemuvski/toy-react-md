import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import App from './App'

function getTextareaElement(container: HTMLElement) {
  const element = container.getElementsByTagName('textarea').item(0)
  if (!element) {
    throw new Error('textarea要素が見当たらないため、処理を中断しました。')
  }
  return element
}

describe('[Component] MarkdownViewer', function () {
  it('初期表示時は、テキストエリアの内容は空', function () {
    const { container } = render(<App />)
    const textareaElement = getTextareaElement(container)
    expect(textareaElement.value).toBe('')
  })

  it('テキストエリアに入力された時、内容が反映される', function () {
    const { container } = render(<App />)
    const textareaElement = getTextareaElement(container)

    fireEvent.change(textareaElement, { target: { value: 'CHANGE!!!' } })

    expect(textareaElement.value).toBe('CHANGE!!!')
    expect(container.querySelector('div.md > p')).toHaveTextContent('CHANGE!!!')
  })
})
