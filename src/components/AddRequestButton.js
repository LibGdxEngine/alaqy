import { Tooltip } from '@tailwindcss/ui';

function MyButton() {
  return (
    <div className="group inline-block">
      <Tooltip className="group-hover:visible" content="Click me!">
        <button className="bg-black text-white rounded-full inline-block p-3 transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:shadow-outline transform hover:scale-110">
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </button>
      </Tooltip>
    </div>
  );
}

export default MyButton;