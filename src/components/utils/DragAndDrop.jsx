import React, {useRef, useEffect} from 'react'

export default function DragAndDrop() {
    const h5Ref = useRef(null);




    const allowDrop = (ev) => {
        ev.preventDefault();
      };
      
    const drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
        console.log(ev.target.id);
        console.log(ev.target);
        console.log(ev.target.key);
        //agregado
      };

    const drop = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const draggableElement = document.getElementById(data);
        const dropzone = ev.target;
    
        // Comprueba que el elemento exista antes de agregarlo al contenedor
        if (draggableElement && dropzone !== draggableElement) {
          try {
            dropzone.appendChild(draggableElement);
          } catch (error) {
            console.log("Error");
          }
    
          // Toma posición del mouse dentro del contenedor
          const rect = dropzone.getBoundingClientRect();
          console.log(dropzone);
          let x = ev.clientX - draggableElement.offsetWidth - rect.left;
          let y = ev.clientY - draggableElement.offsetHeight - rect.top;
    
          // Obtiene las dimensiones del contenedor
          const containerWidth = rect.width;
          const containerHeight = rect.height;
    
          // Calcula la posición en porcentaje (%) dentro del contenedor
          const posX = (x / containerWidth) * 100;
          const posY = (y / containerHeight) * 100;
    
          // Asigna la posición al texto utilizando los valores en porcentaje (%)
    
          draggableElement.style.left = `${posX > maxW ? maxW : (posX < minW ? minW : posX)}%`;
          draggableElement.style.top = `${posY > maxH ? maxH : (posY < minH ? minH : posY)}%`;
    
          //Setea las posiciones de left y top
          setPosx(posX);
          setPosy(posY);
        }
      };
     useEffect(() => {
        const handleClick = (e) => {
          const obj = e.target;
      
          if (obj.tagName === "H5") {
            if (h5Ref.current && h5Ref.current !== obj) {
              h5Ref.current.classList.remove("movible");
            }
            h5Ref.current = obj;
            h5Ref.current.classList.toggle("movible");
            setTextSize(parseInt(h5Ref.current.style.fontSize));
            setPosx(parseInt(h5Ref.current.style.left));
            setPosy(parseInt(h5Ref.current.style.top));
          } else if (obj.tagName === "DIV") {
            if (h5Ref.current) {
              h5Ref.current.classList.remove("movible");
              h5Ref.current = null;
            }
          }
        };
      
        document.addEventListener("click", handleClick);
      
        return () => {
          document.removeEventListener("click", handleClick);
        };
      }, []);


  return (
    <div>
      
    </div>
  )
}
