/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/Dp4CdCmuZlp
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import Link from "next/link"
import { Label } from "src/UIs/ui/label"
import { Input } from "src/UIs/ui/input"
import { Select } from "src/UIs/ui/select"
import { Button } from "src/UIs/ui/button"

export function Profile() {
  return (
    (<div
      className="w-full max-w-4xl mx-auto grid md:grid-cols-[250px_1fr] items-start gap-6 px-6">
      <div className="space-y-1">
        <Link
          href="#"
          className="flex items-center space-x-2 py-2 rounded-md text-sm font-medium bg-gray-100"
          prefetch={false}>
          <UserIcon className="w-6 h-6" />
          Profile Information
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-2 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          prefetch={false}>
          <LockIcon className="w-6 h-6" />
          Privacy Settings
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-2 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          prefetch={false}>
          <LockIcon className="w-6 h-6" />
          Account Security
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-2 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          prefetch={false}>
          <BellIcon className="w-6 h-6" />
          Notifications
        </Link>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-sm">
            Name
          </Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm">
            Email
          </Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-sm">
            Password
          </Label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="language" className="text-sm">
            Language
          </Label>
          <Select id="language">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Chinese</option>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="timezone" className="text-sm">
            Timezone
          </Label>
          <Select id="timezone">
            <option>(UTC-11:00) Niue</option>
            <option>(UTC-10:00) Hawaii</option>
            <option>(UTC-09:00) Alaska</option>
            <option>(UTC-08:00) Pacific Time (US & Canada)</option>
            <option>(UTC-07:00) Mountain Time (US & Canada)</option>
            <option>(UTC-06:00) Central Time (US & Canada)</option>
            <option>(UTC-05:00) Eastern Time (US & Canada)</option>
            <option>(UTC-04:00) Atlantic Time (Canada)</option>
            <option>(UTC-03:30) Newfoundland</option>
            <option>(UTC+00:00) Greenwich Mean Time</option>
            <option>(UTC+01:00) Central European Time</option>
            <option>(UTC+02:00) Eastern European Time</option>
            <option>(UTC+03:00) Moscow Standard Time</option>
            <option>(UTC+03:30) Iran Standard Time</option>
            <option>(UTC+04:00) Gulf Standard Time</option>
            <option>(UTC+04:30) Afghanistan Time</option>
            <option>(UTC+05:00) Pakistan Standard Time</option>
            <option>(UTC+05:30) Indian Standard Time</option>
            <option>(UTC+05:45) Nepal Time</option>
            <option>(UTC+06:00) Bangladesh Standard Time</option>
            <option>(UTC+06:30) Cocos Islands Time</option>
            <option>(UTC+07:00) Indochina Time</option>
            <option>(UTC+08:00) China Standard Time</option>
            <option>(UTC+08:45) Southeastern Western Australia Standard Time</option>
            <option>(UTC+09:00) Japan Standard Time</option>
            <option>(UTC+09:30) Australian Central Standard Time</option>
            <option>(UTC+10:00) Australian Eastern Standard Time</option>
            <option>(UTC+10:30) Lord Howe Standard Time</option>
            <option>(UTC+11:00) Solomon Islands Time</option>
            <option>(UTC+11:30) Norfolk Island Time</option>
            <option>(UTC+12:00) New Zealand Standard Time</option>
            <option>(UTC+12:45) Chatham Islands Time</option>
            <option>(UTC+13:00) Phoenix Islands Time</option>
            <option>(UTC+14:00) Line Islands Time</option>
          </Select>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
          <Button className="w-full">Save Changes</Button>
        </div>
      </div>
    </div>)
  );
}

function BellIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>)
  );
}


function LockIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>)
  );
}


function UserIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>)
  );
}


function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
