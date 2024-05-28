import React from "react";
import { Footer, FooterCopyright, FooterDivider, FooterIcon } from "flowbite-react";
import {Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble, BsPinterest, BsTwitch } from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5 ">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl
      font-semibold dark:text-white"
            >
              <span className="px-2 py-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text font-bold text-3xl">
                Gridify
              </span>              
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
            <Footer.Title title='About' />
            <Footer.LinkGroup col>
                <Footer.Link
                    href='https://www.100jsprojects.com'
                    targets='_blank'
                    rel="noopener noreferrer"
                >
                    100 JS Projects 
                </Footer.Link>
                <Footer.Link
                    href='/about'
                    targets='_blank'
                    rel="noopener noreferrer"
                >
                    Blog 
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Follow Us' />
            <Footer.LinkGroup col>
                <Footer.Link
                    href='https://www.githun/ShanaGari7.com'
                    targets='_blank'
                    rel="noopener noreferrer"
                >
                    Github 
                </Footer.Link>
                <Footer.Link
                    href='#'
                    targets='_blank'
                    rel="noopener noreferrer"
                >
                    Discord 
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Legal' />
            <Footer.LinkGroup col>
                <Footer.Link
                    href='#'                    
                >
                    Privacy Policies
                </Footer.Link>
                <Footer.Link
                    href='#'
                >
                    Terms &amp; Conditions
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href='#' by="Gridify's blog" year={new Date().getFullYear()}/>
        </div>
        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <FooterIcon href='#' icon={BsFacebook}/>
            <FooterIcon href='#' icon={BsInstagram}/>
            <FooterIcon href='#' icon={BsTwitter}/>
            <FooterIcon href='#' icon={BsPinterest}/>
            <FooterIcon href='#' icon={BsGithub}/>
            <FooterIcon href='#' icon={BsDribbble}/>
            <FooterIcon href='#' icon={BsTwitch}/>
        </div>
      </div>
    </Footer>
  );
}
