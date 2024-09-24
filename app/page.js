// File: app/page.js
'use client';

import React, { useState } from 'react';
import { X, Menu, LogIn, UserPlus, Book, Mic, Save } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const [currentView, setCurrentView] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [context, setContext] = useState('');
  const [notes, setNotes] = useState('');
  const [wordBank, setWordBank] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentView('main');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setCurrentView('login');
  };

  const handleContextChange = (e) => {
    setContext(e.target.value);
    // Simulate generating a word bank based on context
    setWordBank(['customer', 'support', 'issue', 'resolution', 'feedback']);
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, notes]);
    setNotes('');
  };

  const LoginView = () => (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Button type="submit" className="w-full">Log In</Button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Button variant="link" onClick={() => setCurrentView('register')}>Register</Button>
        </p>
      </CardContent>
    </Card>
  );

  const RegisterView = () => (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input type="text" placeholder="Name" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Input type="password" placeholder="Confirm Password" required />
          <Button type="submit" className="w-full">Register</Button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Button variant="link" onClick={() => setCurrentView('login')}>Log In</Button>
        </p>
      </CardContent>
    </Card>
  );

  const MainView = () => (
    <div className="flex h-screen">
      <aside className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <nav>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentView('saved')}>
            <Book className="mr-2" />
            Saved Notes
          </Button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu />
          </Button>
          <h1 className="text-2xl font-bold">Call Interpreter</h1>
          <Button variant="ghost" size="icon" onClick={() => setCurrentView('login')}>
            <LogIn />
          </Button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Context</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter call context..." 
                  value={context} 
                  onChange={handleContextChange}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Word Bank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {wordBank.map((word, index) => (
                    <Button key={index} variant="outline">{word}</Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Take notes during the call..." 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                />
                <div className="flex justify-between">
                  <Button variant="outline">
                    <Mic className="mr-2" />
                    Start Recording
                  </Button>
                  <Button onClick={handleSaveNote}>
                    <Save className="mr-2" />
                    Save Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );

  const SavedNotesView = () => (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Notes</h2>
      {savedNotes.map((note, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="p-4">
            <p>{note}</p>
          </CardContent>
        </Card>
      ))}
      <Button onClick={() => setCurrentView('main')}>Back to Main</Button>
    </div>
  );

  return (
    <div>
      {currentView === 'login' && <LoginView />}
      {currentView === 'register' && <RegisterView />}
      {currentView === 'main' && <MainView />}
      {currentView === 'saved' && <SavedNotesView />}
    </div>
  );
}