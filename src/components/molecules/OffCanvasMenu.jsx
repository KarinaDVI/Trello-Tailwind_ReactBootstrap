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
  const darkColors= darkMode?'bg-gray-800 text-gray-100':'bg-blue-400 text-gray-100'


  const handleShowTablero = (id) => {
    setShowTablero(true);
    setSelectedTablero(id)
    
  };

  return (
    <>
    
          <div className={`mr-8 ml-2 absolute left-0 top-80 pr-2 pt-4 sm:-mr-10 sm:pr-4`}>
            <button
              type="button"
              className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white opacity-100"
              onClick={() => setOpen(!open)} 
              hidden={open}
            >
              <span className="sr-only">Close panel</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>

            </button>
          </div>
     
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
                enterFrom="opacity-100"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-100"
              >
                <div className={`absolute right-11 top-80 -mr-8 pr-2 pt-4 sm:-mr-10 sm:pr-4 z-50`}>
                  <button
                    type="button"
                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white opacity-100"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>

                  </button>
                </div>
              </Transition.Child>
              <div className={`flex h-full flex-col overflow-y-scroll ${darkColors} py-6 shadow-xl`}>
                <div className="px-4 sm:px-6">
                  <Dialog.Title className="text-base font-semibold leading-6">
                    Tableros
                  </Dialog.Title>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6 ">
                    {tablero.map((tablerox) => (
                    <div className="d-flex  border-white" key={tablerox.id}>
                        
                        <Card className={`d-flex mx-2 ${darkColors} rounded-md px-10 py-2`} >
                        <Card.Header className="text-md text-center text-gray-100 py-3">{tablerox.Titulo}</Card.Header>
                        <Card.Body className="flex space-x-4 text-center justify-center">
                            
                            <Button
                            className="text-sm text-gray-100 bg-blue-600/50 hover:opacity-75 rounded-md p-2 word-break"
                            onClick={() => handleShowTablero(tablerox.id)}
                            >
                            Mostrar Tablero
                            </Button>
                            <Button 
                            className="text-sm text-gray-100 bg-gray-600 bg-opacity-50 hover:opacity-75 text-gray-100/75 p-2 rounded-md word-break" 
                            onClick={() => quitTablero(tablerox.id)}>
                            Eliminar Tablero
                            </Button>
                        </Card.Body>
                        </Card> 
                        </div>
                    ))}
                    <div className="d-block pb-8 pt-2 md-mx-auto">
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
                        <Button onClick={hideTablero} className={`w-64 border-none rounded-2xl text-start ps-3 py-3 pe-8 pe-8 ${darkMode?'bg-gray-500/25 text-gray-100':'bg-blue-300/50 text-white'} hover:opacity-75  text-sm ml-2 px-10`}>
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
  </>
);

}