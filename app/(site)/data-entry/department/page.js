export default function Department () {
    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-3/5 border rounded p-6 px-20">
                <form className="space-y-2">
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Department Name"
                    />
                    <button
                        className="p-1 w-1/3 bg-slate-600 hover:bg-cyan-900 rounded"
                    >
                        save
                    </button>
                </form>
            </div>
        </div>
    )
}