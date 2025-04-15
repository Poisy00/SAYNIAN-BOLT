import React from 'react';

const team = [
  {
    name: 'Li Wei',
    role: 'Game Designer',
    avatar: 'https://images.unsplash.com/photo-1576619940608-d3e8c96c8e29',
    bio: 'Master of game mechanics and cultural integration',
  },
  {
    name: 'Sarah Chen',
    role: 'Art Director',
    avatar: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    bio: 'Blending traditional Chinese art with modern design',
  },
  {
    name: 'Mike Zhang',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1575669934467-5b73d5a9f869',
    bio: 'Bringing the digital wheel to life',
  },
];

export default function Team() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {team.map((member) => (
        <div
          key={member.name}
          className="bg-black/30 rounded-lg overflow-hidden transition hover:transform hover:scale-105"
        >
          <div
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${member.avatar})` }}
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-red-500">{member.name}</h3>
            <p className="text-gold-400 mb-2">{member.role}</p>
            <p className="text-gray-300">{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}