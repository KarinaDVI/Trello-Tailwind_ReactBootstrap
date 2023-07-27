import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDarkMode } from '../utils/DarkModeContext'
import { Button, Card } from 'react-bootstrap';
import InputTablero from './../atoms/InputTablero';

export default function OffCanvasMenu({tablero,setShowTablero,
                                      setSelectedTablero, 
                                      selectedTablero, userId,
                                      quitTablero, showInputTablero,
                                      handleAddTablero, hideTablero,
                                      cancelTablero, setTitleTablero,
                                      titleTablero, tableroId,
                                      tableroLong}) {
  const {darkMode}= useDarkMode();
  const [open, setOpen] = useState(true)
  const darkColors= darkMode?'bg-blue-700/25 text-gray-100':'bg-blue-300/50 text-gray-100'
  const [initialTouchX, setInitialTouchX] = useState(null);
  const [currentTouchX, setCurrentTouchX] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    const touchX = e.touches[0].clientX;
    setTouchStartX(touchX);
  };

  const handleTouchMove = (e) => {
    if (!touchStartX) return;

    const touchX = e.touches[0].clientX;
    const distanceX = touchX - touchStartX;
    const threshold = 50; // Adjust the threshold as needed

    if (distanceX <= -threshold) {
      setOpen(true);
    } else if (distanceX >= threshold) {
      setOpen(false);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const openSlide = (e) =>{
    const mouseX = e.clientX;
      if (mouseX <= 20) {
       setOpen(true) 
  }
}

useEffect(() => {
    document.addEventListener('mousemove', openSlide);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
        document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  const handleShowTablero = (id) => {
    setShowTablero(true);
    setSelectedTablero(id)
    
  };

  return (
    <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={() => setOpen(false)}>
      <div className="absolute inset-0 overflow-hidden">
        <Transition.Child
          as={Fragment}
          enter="transform ease-in-out duration-500 sm:duration-700"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Overlay className={`fixed inset-0 bg-gray-500 bg-opacity-0 transition-opacity`} />
        </Transition.Child>

        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md md:max-w-xs">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-0 top-0 -mr-8 flex pr-2 pt-4 sm:-mr-10 sm:pr-4">
                  <button
                    type="button"
                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className={`flex h-full flex-col overflow-y-scroll ${darkColors} py-6 shadow-xl`}>
                <div className="px-4 sm:px-6">
                  <Dialog.Title className="text-base font-semibold leading-6">
                    Panel title
                  </Dialog.Title>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {tablero.map((tablerox) => (
                    <div className="d-flex my-5 border-white" style={{marginTop:"5%"}}key={tablerox.id}>
                        
                        <Card className={`d-flex mx-2 ${darkColors} rounded-md px-10 py-3`} >
                        <Card.Header className="text-lg text-center text-gray-100 py-5">{tablerox.Titulo}</Card.Header>
                        <Card.Body className="flex space-x-4 text-center justify-center">
                            <Button
                            className="text-gray-100 bg-blue-600/50 hover:opacity-75 rounded-md p-2 word-break"
                            onClick={() => handleShowTablero(tablerox.id)}
                            >
                            Mostrar Tablero
                            </Button>
                            <Button 
                            className="text-gray-100 bg-gray-600 bg-opacity-50 hover:opacity-75 text-gray-100/75 p-2 rounded-md word-break" 
                            onClick={() => quitTablero(tablerox.id)}>
                            Eliminar Tablero
                            </Button>
                        </Card.Body>
                        </Card> 
                        </div>
                    ))}
                    <div className="d-block pb-8 mx-4">
                        {showInputTablero?(
                        <InputTablero
                            
                            userId={userId}
                            handleAddTablero={handleAddTablero}
                            cancelTablero={cancelTablero}
                            tableroId={tableroId}
                            setTitleTablero={setTitleTablero}
                            titleTablero={titleTablero}
                            classVar={darkColors}
                        />
                        ):(
                        <Button onClick={hideTablero} className={`w-64 border-none rounded-2xl text-start ps-3 py-3 pe-8 pe-8 ${darkMode?'bg-blue-400/25 text-gray-100':'bg-blue-300/50 text-white'} hover:opacity-75  text-sm ml-2 px-10`}>
                        {tablero.length<1?("+Añada un tablero..."):("+Añada otro tablero...")}
                        </Button>
                        )}
                    </div>
                    
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);
}