interface ProfileProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  urlWebsite?: string;
  urlGitHub?: string;
  urlLinkedIn?: string;
  urlMastodon?: string;
  urlTwitter?: string;
}

const Profile = ({
  name,
  role,
  image,
  bio,
  urlWebsite,
  urlGitHub,
  urlLinkedIn,
  urlMastodon,
  urlTwitter,
}: ProfileProps) => {
  return (
    <div className="flex flex-row gap-8 ">
      <div className="shrink-0">
        <img
          className="w-24 aspect-square rounded-2xl object-cover"
          src={image}
          alt={name}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold leading-8 tracking-tight">
          {name}
        </h3>
        <p className="text-zinc-400">{role}</p>
        <p className="mt-6 text-base leading-7 mb-8">{bio}</p>
        <ul className="text-sm leading-6">
          {urlWebsite && (
            <li>
              <span className="text-zinc-400">Website: </span>
              <a className="text-orange-200" href={urlWebsite}>
                {urlWebsite}
              </a>
            </li>
          )}
          {urlGitHub && (
            <li>
              <span className="text-zinc-400">GitHub: </span>
              <a className="text-orange-200" href={urlGitHub}>
                {urlGitHub}
              </a>
            </li>
          )}
          {urlLinkedIn && (
            <li>
              <span className="text-zinc-400">LinkedIn: </span>
              <a className="text-orange-200" href={urlLinkedIn}>
                {urlLinkedIn}
              </a>
            </li>
          )}
          {urlMastodon && (
            <li>
              <span className="text-zinc-400">Mastodon: </span>
              <a className="text-orange-200" href={urlMastodon}>
                {urlMastodon}
              </a>
            </li>
          )}
          {urlTwitter && (
            <li>
              <span className="text-zinc-400">Twitter: </span>
              <a className="text-orange-200" href={urlTwitter}>
                {urlTwitter}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
