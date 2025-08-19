import { useRef } from 'react'
import Button from '../button/Button'
import './popup.css'

interface PopupProps {
  prop: PopupData | null;
  onClose: () => void;
}

interface PopupData {
  code?: string;
  message?: string;
  [key: string]: any;
}

const Popup: React.FC<PopupProps> = ({ prop, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const popup_down = (): void => {
    if (ref.current) {
      ref.current.style.transform = 'translateY(75vh)';
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.display = 'none';
        }
        if (onClose) onClose();
      }, 500);
    }
  };

  if (!prop) return null;

  return (
    <div id='main_bg'>
      <div id='bg'></div>
      <div ref={ref} id='sheet'>
        <div id="grab"></div>
        <h2>{prop?.code}</h2>
        <div id='statement'>{prop?.message}</div>
        <div id='button_popup'>
          <Button
            type='button'
            color='#000'
            work='Okay'
            width='10vh'
            onClick={popup_down}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
