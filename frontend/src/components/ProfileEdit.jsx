import React, { useState } from 'react';

const ProfileEdit = ({ profile, onSave, onCancel }) => {
    const [editedProfile, setEditedProfile] = useState(profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({ ...editedProfile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedProfile);
    };

    return (
        <div className="max-w-[600px] w-full h-full relative bg-black bg-opacity-60 backdrop-blur-sm border rounded-[10px] border-primary-pink shadow">
            <form onSubmit={handleSubmit} className="px-4 py-6">
                {/* Profile Inputs */}
                <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full h-12 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                />
                <input
                    type="text"
                    name="role"
                    value={editedProfile.role}
                    onChange={handleChange}
                    placeholder="Role"
                    className="w-full h-12 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                />
                <input
                    type="text"
                    name="status"
                    value={editedProfile.status}
                    onChange={handleChange}
                    placeholder="Status"
                    className="w-full h-12 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                />
                <input
                    type="text"
                    name="address"
                    value={editedProfile.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full h-12 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                />
                <input
                    type="text"
                    name="gender"
                    value={editedProfile.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                    className="w-full h-12 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                />
                <input
                    type="text"
                    name="idWeAre"
                    value={editedProfile.idWeAre}
                    onChange={handleChange}
                    placeholder="ID We Are"
                    className="w-full h-12 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                />
                <input
                    type="text"
                    name="lookingFor"
                    value={editedProfile.lookingFor}
                    onChange={handleChange}
                    placeholder="Looking For"
                    className="w-full h-12 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                />
                <input
                    type="text"
                    name="type16"
                    value={editedProfile.type16}
                    onChange={handleChange}
                    placeholder="Type16"
                    className="w-full h-12 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                />
                <input
                    type="text"
                    name="interests"
                    value={editedProfile.interests}
                    onChange={handleChange}
                    placeholder="Interests"
                    className="w-full h-12 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                />

                {/* Action Buttons */}
                <div className="flex justify-between gap-5 mt-4">
                    <button
                        type="submit"
                        className="flex-1 h-12 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 focus:outline-none"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 h-12 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;