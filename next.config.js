
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
        pathname: '/**',
      },
    ],
    domains: [
      'scontent-jnb2-1.xx.fbcdn.net',
      'scontent.fblz2-1.fna.fbcdn.net',
      'images.unsplash.com',
      'i.pinimg.com',
      'scontent.fblz1-1.fna.fbcdn.net', // Add the problematic domain here
    ],
  },
}
