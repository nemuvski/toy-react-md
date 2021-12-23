import React from 'react'
import { render, screen } from '@testing-library/react'
import MarkdownViewer from './MarkdownViewer'

const md = 'div.md'

describe('[Component] MarkdownViewer', function () {
  it('空文字が与えられた時、プレースホルダーが表示される', function () {
    render(<MarkdownViewer markdownText={''} />)
    expect(screen.getByText(/入力されるとプレビューに反映されます。/)).toBeInTheDocument()
  })

  it('script要素等が与えられた時、内容は出力されない', function () {
    const { container } = render(
      <MarkdownViewer markdownText={`<style></style><script>console.log('TEST')</script>`} />
    )
    expect(container.querySelector(md)).toBeEmptyDOMElement()
  })

  describe('出力される要素を評価する', function () {
    it('p', function () {
      const { container } = render(<MarkdownViewer markdownText={`Hi!`} />)
      expect(container.querySelector(`${md} > p`)).not.toBeNull()
    })
    it('br', function () {
      const { container } = render(<MarkdownViewer markdownText={`Hi!<br />I am Bob.`} />)
      expect(container.querySelector(`${md} > p > br`)).not.toBeNull()
    })
    it('ul, li', function () {
      const { container } = render(<MarkdownViewer markdownText={`- apple\n- orange`} />)
      expect(container.querySelector(`${md} > ul`)).not.toBeNull()
      expect(container.querySelector(`${md} > ul > li`)).not.toBeNull()
    })
    it('ol, li', function () {
      const { container } = render(<MarkdownViewer markdownText={`1. apple\n2. orange`} />)
      expect(container.querySelector(`${md} > ol`)).not.toBeNull()
      expect(container.querySelector(`${md} > ol > li`)).not.toBeNull()
    })
    it('blockquote', function () {
      const { container } = render(<MarkdownViewer markdownText={`> Once upon a long time ago`} />)
      expect(container.querySelector(`${md} > blockquote`)).not.toBeNull()
    })
    it('strong', function () {
      const { container } = render(<MarkdownViewer markdownText={`I am a **tomato**.`} />)
      expect(container.querySelector(`${md} > p > strong`)).not.toBeNull()
    })
    it('em', function () {
      const { container } = render(<MarkdownViewer markdownText={`I am a *potato*.`} />)
      expect(container.querySelector(`${md} > p > em`)).not.toBeNull()
    })
    it('a', function () {
      const { container } = render(<MarkdownViewer markdownText={`[Link](https://example.com/)`} />)
      expect(container.querySelector(`${md} > p > a`)).not.toBeNull()
      // rendererでアンカータグをカスタマイズしているので、属性値等についてもテストする
      expect(container.querySelector(`${md} > p > a`)).toHaveAttribute('rel', 'noopener')
      expect(container.querySelector(`${md} > p > a`)).toHaveAttribute('target', '_blank')
      expect(container.querySelector(`${md} > p > a`)).toHaveAttribute('href', 'https://example.com/')
      expect(container.querySelector(`${md} > p > a`)).toHaveTextContent('Link')
    })
    it('a - shorthand', function () {
      const { container } = render(<MarkdownViewer markdownText={`https://example.com/`} />)
      expect(container.querySelector(`${md} > p > a`)).not.toBeNull()
      // rendererでアンカータグをカスタマイズしているので、属性値等についてもテストする
      expect(container.querySelector(`${md} > p > a`)).toHaveAttribute('rel', 'noopener')
      expect(container.querySelector(`${md} > p > a`)).toHaveAttribute('target', '_blank')
      expect(container.querySelector(`${md} > p > a`)).toHaveAttribute('href', 'https://example.com/')
      expect(container.querySelector(`${md} > p > a`)).toHaveTextContent('https://example.com/')
    })
    it('hr', function () {
      const { container } = render(<MarkdownViewer markdownText={`---`} />)
      expect(container.querySelector(`${md} > hr`)).not.toBeNull()
    })
    it('del', function () {
      const { container } = render(<MarkdownViewer markdownText={`~~OK~~`} />)
      expect(container.querySelector(`${md} > p > del`)).not.toBeNull()
    })
    it('pre, code', function () {
      const { container } = render(<MarkdownViewer markdownText={'```\n yarn test \n```'} />)
      expect(container.querySelector(`${md} > pre`)).not.toBeNull()
      expect(container.querySelector(`${md} > pre > code`)).not.toBeNull()
    })
    it('code', function () {
      const { container } = render(<MarkdownViewer markdownText={'`const PI = 3.14`'} />)
      expect(container.querySelector(`${md} > p > code`)).not.toBeNull()
    })
  })
})
