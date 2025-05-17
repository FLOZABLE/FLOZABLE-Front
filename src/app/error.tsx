"use client";

export default function Error() {
  return (
    <main className="w-screen h-screen">
      <div className="absolute-center w-fit flex flex-col gap-3">
        <p className="text-6xl font-bold">Shoot!!</p>
        <p>Well, this is unexpected...</p>
        <p>
          Sorry, this is not working properly. We now know about this mistake
          and are working to fix it.
        </p>
        <p>In the mean time, here is what you can do:</p>
        <ul className="list-disc ml-5">
          <li
            onClick={() => {
              window.location.reload();
            }}
            className="animated-underline w-fit"
          >
            Refresh the page
          </li>
          <li>Try again in 30 minutes</li>
          <li>Email us at support@flozable.com and tell us what happened.</li>
        </ul>
      </div>
    </main>
  );
}
