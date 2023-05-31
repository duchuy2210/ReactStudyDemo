import React from 'react';
import Modal from './Modal';
const PortalModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    setOpen(open => !open);
  };
  return (
    <>
      <div className='relative z-0'>
        <Modal open={open} handleClose={()=>setOpen(open=>!open)}></Modal>
      </div>
      <div className='relative z-50'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, saepe
        sequi reprehenderit harum esse soluta totam sit quasi architecto.
        Dolorem ut officia mollitia autem dicta dolores quidem sint deleniti
        neque. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
        veritatis provident doloribus voluptas iusto, dolore inventore
        consequatur consequuntur nulla quod facilis ratione nihil est iure
        suscipit modi, doloremque quo tempore! Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Sit unde adipisci excepturi laborum vero
        exercitationem quas ullam illum iusto nostrum recusandae nam quod
        facilis dolorem hic deleniti, tenetur doloribus laboriosam. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ea neque in ullam, nisi
        assumenda est nemo. Commodi reiciendis veritatis tempora atque deleniti,
        quos illo debitis ducimus magni id quis voluptate! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Veritatis omnis exercitationem
        aperiam provident quos quod atque ad! Aliquid nesciunt architecto qui
        praesentium minima. Possimus quasi tenetur error vero ex veritatis.
      </div>
      <button
        onClick={handleOpenModal}
        className="block p-5 px-10 mx-auto font-semibold text-white bg-blue-500 rounded-lg mt-7">
        Show Modal
      </button>
    </>
  );
};

export default PortalModal;
