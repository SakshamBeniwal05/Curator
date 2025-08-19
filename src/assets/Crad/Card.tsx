import React, { useRef } from 'react'
import './Card.css'
import useSpotlight from '../../utilities/useSpotlight'
import parse from 'html-react-parser';
import Post from '../../assets/Post/Post'
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  content: string;
  writer: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ title, content, writer, id }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { x, y } = useSpotlight(ref)
  const post_id = id;
  const navigate = useNavigate()
  console.log(post_id);
  
  const Post_Page = (): void => {
    navigate('/post')
    Post({ title, content, writer })
  }

  return (
    <div id='card' ref={ref} style={{
      '--x': `${x}px`,
      '--y': `${y}px`
    } as React.CSSProperties}>
      <div id='card_title'>{title}</div>
      <div id='card_content'>{parse(content)}</div>
      <div id='card_writer'>{writer}</div>
      <div id='learn_more' onClick={Post_Page}>Learn More</div>
    </div>
  )
}

export default Card